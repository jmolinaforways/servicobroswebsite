import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * Cloudflare Worker para servir el sitio web de Servicobros
 */
export default {
  async fetch(request, env, ctx) {
    try {
      // Serve static assets from Workers Sites
      const asset = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: JSON.parse(__STATIC_CONTENT_MANIFEST),
          cacheControl: {
            browserTTL: 31536000, // 1 year
            edgeTTL: 2592000, // 30 days
            bypassCache: false,
          },
        }
      );

      // Add custom headers
      const response = new Response(asset.body, asset);
      
      // Security headers
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'SAMEORIGIN');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      // Cache control based on file type
      const url = new URL(request.url);
      const pathname = url.pathname;
      
      if (pathname.endsWith('.html') || pathname === '/') {
        // Cache HTML for 1 hour
        response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
      } else if (pathname.match(/\.(css|js)$/)) {
        // Cache CSS/JS for 1 year
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
        // Cache images for 1 year
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      }

      return response;
    } catch (error) {
      // Fallback to 404 page
      return new Response('404 Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  },
};

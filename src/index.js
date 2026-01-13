import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    try {
      // Add logic to handle the root path
      const url = new URL(request.url);

      const options = {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
        cacheControl: {
          browserTTL: 60 * 60 * 24 * 365, // 1 year
          edgeTTL: 60 * 60 * 24 * 2, // 2 days
          bypassCache: false,
        },
      };

      try {
        const page = await getAssetFromKV(
          {
            request,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          options
        );

        const response = new Response(page.body, page);

        response.headers.set('X-XSS-Protection', '1; mode=block');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('Referrer-Policy', 'unsafe-url');
        response.headers.set('Feature-Policy', 'none');

        return response;

      } catch (e) {
        // if an error is thrown try to serve the 404 page
        if (!DEBUG) {
          try {
            let notFoundResponse = await getAssetFromKV(
              {
                request: new Request(`${new URL(request.url).origin}/404.html`, request),
                waitUntil: ctx.waitUntil.bind(ctx),
              },
              options
            );
            return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 });
          } catch (e) { }
        }

        return new Response(e.message || e.toString(), { status: 500 });
      }
    } catch (e) {
      return new Response('Internal Error', { status: 500 });
    }
  },
};

const DEBUG = false;

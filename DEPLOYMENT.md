# 🚀 Guía de Deployment - Servicobros Website

Esta guía te ayudará a configurar GitHub y Cloudflare Workers para deploy automático.

## ✅ Pasos Completados

- [x] Repositorio Git inicializado
- [x] Archivos de configuración creados
- [x] Build script funcionando
- [x] GitHub Actions workflow configurado
- [x] Primer commit realizado

## 📋 Siguiente Paso: Crear Repositorio en GitHub

### Opción 1: Desde GitHub Web (Recomendado)

1. **Ir a GitHub**: https://github.com/new

2. **Crear nuevo repositorio**:
   - Repository name: `servicobros-website`
   - Description: `Sitio web oficial de Servicobros - Recuperación de créditos`
   - Visibility: Private (o Public si prefieres)
   - ❌ NO inicializar con README, .gitignore ni LICENSE (ya los tenemos)

3. **Copiar la URL del repositorio** que aparecerá (algo como: `https://github.com/tu-usuario/servicobros-website.git`)

4. **Conectar tu repositorio local con GitHub**:
   ```bash
   git remote add origin https://github.com/tu-usuario/servicobros-website.git
   git push -u origin main
   ```

### Opción 2: Usando GitHub CLI (si la tienes instalada)

```bash
gh auth login
gh repo create servicobros-website --private --source=. --remote=origin --push
```

## ⚙️ Configurar Cloudflare Workers

### Paso 1: Instalar Wrangler CLI (ya incluido en node_modules)

Puedes usar el local:
```bash
npx wrangler login
```

O instalar globalmente:
```bash
npm install -g wrangler
wrangler login
```

### Paso 2: Autenticarse con Cloudflare

```bash
npx wrangler login
```

Esto abrirá tu navegador para autenticarte.

### Paso 3: Obtener tu Account ID

1. Ve a: https://dash.cloudflare.com/
2. Selecciona tu cuenta
3. Ve a "Workers & Pages"
4. Tu Account ID aparece en la barra lateral derecha

### Paso 4: Crear API Token para GitHub Actions (Opcional - para deploy automático)

1. Ve a: https://dash.cloudflare.com/profile/api-tokens
2. Click en "Create Token"
3. Usa la plantilla "Edit Cloudflare Workers"
4. Copia el token generado

### Paso 5: Configurar Secrets en GitHub (Para deploy automático)

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Agrega estos secrets:
   - `CLOUDFLARE_API_TOKEN`: El token del paso 4
   - `CLOUDFLARE_ACCOUNT_ID`: Tu Account ID del paso 3

## 🚀 Deploy Manual (Primera vez)

```bash
# 1. Build del proyecto
npm run build

# 2. Deploy a Cloudflare Workers
npx wrangler deploy
```

Wrangler te mostrará la URL donde está desplegado tu sitio (algo como: `servicobros-website.workers.dev`)

## 🔄 Deploy Automático (Después de configurar GitHub)

Una vez configurados los secrets en GitHub, cada vez que hagas push a main:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

GitHub Actions automáticamente hará deploy a Cloudflare Workers.

## 🌐 Configurar Dominio Personalizado

### En Cloudflare Dashboard:

1. Ve a Workers & Pages → Tu worker
2. Settings → Triggers → Custom Domains
3. Click "Add Custom Domain"
4. Ingresa tu dominio (ej: `servicobros.com`)
5. Sigue las instrucciones para configurar el DNS

### En wrangler.toml:

Descomenta y actualiza:
```toml
routes = [
  { pattern = "servicobros.com", custom_domain = true }
]
```

## 📝 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build
npm run build

# Deploy a producción
npm run deploy

# Ver logs del worker
npx wrangler tail

# Ver versiones desplegadas
npx wrangler deployments list
```

## ✅ Checklist de Deployment

- [ ] Repositorio creado en GitHub
- [ ] Código pusheado a GitHub
- [ ] Wrangler CLI autenticado
- [ ] Primer deploy manual exitoso
- [ ] (Opcional) Secrets configurados en GitHub para deploy automático
- [ ] (Opcional) Dominio personalizado configurado

## 🆘 Solución de Problemas

### Error: "Not authenticated"
```bash
npx wrangler login
```

### Error en el build
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Worker no actualiza
```bash
# Limpiar caché
npx wrangler dev --local-protocol=https
```

## 📞 Contacto

Si tienes problemas, contacta a:
- **Web Development**: Forways (https://forways.com.do/)

---

**¡Tu sitio está listo para deploy! 🎉**

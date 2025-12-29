# Servicobros - Sitio Web Oficial

Sitio web profesional para **Servicobros**, empresa líder en recuperación de créditos y gestión de cobros en República Dominicana.

## 🚀 Características

- **Diseño moderno y responsivo** - Adaptado para móvil, tablet y escritorio
- **Optimizado para SEO** - Meta tags completos y structured data
- **Rendimiento optimizado** - Carga rápida con lazy loading de imágenes
- **Alojamiento en Cloudflare Workers** - CDN global para máxima velocidad

## 🛠️ Tecnologías

- HTML5 / CSS3
- Cloudflare Workers
- Google Fonts (Inter, Outfit)
- Unsplash (imágenes profesionales)

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/[tu-usuario]/servicobros-website.git
cd servicobros-website
```

2. Instalar dependencias:
```bash
npm install
```

## 🔧 Desarrollo Local

Para ejecutar el sitio localmente con Cloudflare Workers:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:8787`

## 🚀 Deployment a Producción

### Configuración Inicial

1. Instalar Wrangler CLI globalmente (si aún no lo tienes):
```bash
npm install -g wrangler
```

2. Autenticarse con Cloudflare:
```bash
wrangler login
```

### Deploy

Para hacer deploy a producción:

```bash
npm run deploy
```

Este comando:
1. Construye el proyecto (`npm run build`)
2. Despliega a Cloudflare Workers (`wrangler deploy`)

## 📁 Estructura del Proyecto

```
servicobros-website/
├── assets/              # Imágenes y recursos estáticos
├── public/              # (Generado) Archivos para deployment
├── scripts/             # Scripts de build
├── src/                 # Código del Worker
│   └── index.js        # Worker principal
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── package.json        # Dependencias
├── wrangler.toml       # Configuración de Cloudflare
└── README.md           # Este archivo
```

## 🌐 Configurar Dominio Personalizado

Para usar tu propio dominio:

1. En `wrangler.toml`, descomenta y actualiza la sección de routes:
```toml
routes = [
  { pattern = "servicobros.com", custom_domain = true }
]
```

2. En el Dashboard de Cloudflare, agrega el dominio a tu Worker

## 🔄 Workflow de Desarrollo

1. **Crear una rama** para nuevos cambios:
```bash
git checkout -b feature/nueva-funcionalidad
```

2. **Hacer cambios** en los archivos

3. **Probar localmente**:
```bash
npm run dev
```

4. **Commit y push**:
```bash
git add .
git commit -m "Descripción de cambios"
git push origin feature/nueva-funcionalidad
```

5. **Deploy a producción** (desde main):
```bash
git checkout main
git merge feature/nueva-funcionalidad
npm run deploy
```

## 📝 Variables de Entorno

Si necesitas agregar variables de entorno, edita `wrangler.toml`:

```toml
[vars]
ENVIRONMENT = "production"
```

## 🎨 Diseño

Diseñado y desarrollado por [**Forways**](https://forways.com.do/)

## 📄 Licencia

© 2025 Servicobros. Todos los derechos reservados.

## 📞 Contacto

- **Teléfono**: 809-541-1435
- **Dirección**: Av. Abraham Lincoln 1019, Edificio Federico Pagés, 5to piso, Santo Domingo
- **Web**: servicobros.com

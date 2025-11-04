# Website Frontend - K'Vernicola

Frontend del sitio web público de K'Vernicola construido con SvelteKit, Skeleton UI y Tailwind CSS.

## 🏗️ Arquitectura

### Stack Tecnológico

- **SvelteKit**: Framework de aplicaciones web con SSR (Server-Side Rendering)
- **Skeleton UI**: Biblioteca de componentes UI construida sobre Tailwind CSS
- **Tailwind CSS**: Framework de estilos utility-first
- **Vite**: Build tool y dev server ultrarrápido

### Renderizado

- **SSR (Server-Side Rendering)**: Todas las páginas se renderizan en el servidor para mejor SEO
- **Carga de datos**: Se usa `+page.server.js` para cargar datos desde el backend de Django
- **Colores dinámicos**: Los colores del sitio se cargan desde la API y se aplican dinámicamente

## 📁 Estructura del Proyecto

```
website-frontend/
├── src/
│   ├── routes/                    # Rutas de SvelteKit
│   │   ├── +layout.server.js     # Carga config global y páginas legales
│   │   ├── +layout.svelte        # Header y Footer dinámicos
│   │   ├── +page.server.js       # Carga datos del menú
│   │   ├── +page.svelte          # Página de inicio (Menú)
│   │   ├── galeria/              # Galería de imágenes
│   │   ├── blog/                 # Blog
│   │   ├── reservas/             # Formulario de reservas
│   │   ├── club-fidelizacion/    # Club de fidelización
│   │   ├── como-llegar/          # Página de contacto/ubicación
│   │   └── legal/[slug]/         # Páginas legales dinámicas
│   ├── lib/
│   │   ├── components/           # Componentes reutilizables
│   │   ├── utils/
│   │   │   └── api.js           # Cliente API para backend
│   │   └── stores/              # Stores de Svelte
│   ├── app.html                 # Template HTML principal
│   └── app.css                  # Estilos globales
├── static/                      # Archivos estáticos
├── .env                        # Variables de entorno
├── svelte.config.js            # Configuración de SvelteKit
├── tailwind.config.js          # Configuración de Tailwind
└── package.json                # Dependencias
```

## 🚀 Instalación

### 1. Instalar dependencias

```powershell
npm install
```

### 2. Configurar variables de entorno

```powershell
# Copiar archivo de ejemplo
Copy-Item .env.example .env
```

Editar `.env`:
```env
PUBLIC_API_URL=http://localhost:8000
```

Para producción:
```env
PUBLIC_API_URL=https://api.kvernicola.cl
```

### 3. Iniciar servidor de desarrollo

```powershell
npm run dev
```

El sitio estará disponible en http://localhost:5173

## 📄 Páginas Implementadas

### 1. Página de Inicio (Menú) - `/`
- Hero section con imagen de fondo
- Filtros por categoría
- Grid de productos con imágenes
- Precios y descripciones
- Carga de datos: `+page.server.js` llama a `/api/website/menu/`

### 2. Galería - `/galeria`
- Grid de imágenes de la galería
- Filtros por categoría
- Modal de imagen ampliada
- Carga de datos: `/api/website/gallery/`

### 3. Blog - `/blog`
- Lista de posts con imagen destacada
- Filtros por categoría y tags
- Búsqueda de posts
- Detalle de post: `/blog/[slug]`
- Incrementa contador de vistas automáticamente

### 4. Reservas - `/reservas`
- Formulario de reserva
- Validación de campos
- Confirmación con código de reserva
- Action de SvelteKit para POST a `/api/website/reservations/`

### 5. Club de Fidelización - `/club-fidelizacion`
- Información del programa
- Lista de beneficios
- Formulario de inscripción
- Confirmación con código de miembro

### 6. Cómo Llegar - `/como-llegar`
- Información de contacto
- Mapa de Google Maps embebido
- Horarios de apertura

### 7. Páginas Legales - `/legal/[slug]`
- Páginas dinámicas desde la API
- Política de privacidad
- Términos y condiciones
- Cookies, GDPR, etc.

## 🎨 Diseño y Estilos

### Colores Dinámicos

Los colores se cargan desde la API (`WebsiteSettings`):
- `primary_color`: Color principal del sitio
- `secondary_color`: Color secundario
- `accent_color`: Color de acento para botones

Se aplican como variables CSS:
```css
:root {
  --color-primary: #e74c3c;
  --color-secondary: #2c3e50;
  --color-accent: #f39c12;
}
```

### Componentes de Skeleton UI

- **Buttons**: `btn variant-filled-primary`
- **Cards**: `card`
- **Forms**: `input`, `textarea`, `select`
- **Modals**: `modal`
- **Alerts**: `alert`

## 📊 SEO y Analytics

### Google Analytics

El ID de Google Analytics se carga desde `WebsiteSettings.google_analytics_id`:
- Script inyectado dinámicamente en `+layout.svelte`
- Tracking automático de pageviews en cambios de ruta

### Meta Tags

Cada página define sus propios meta tags:
```svelte
<svelte:head>
  <title>Página - K'Vernicola</title>
  <meta name="description" content="Descripción de la página" />
</svelte:head>
```

### Sitemap y Robots.txt

TODO: Implementar generación dinámica de sitemap.xml usando `site_url` de la API.

## 🔌 Integración con Backend

### Cliente API

El archivo `src/lib/utils/api.js` proporciona un cliente para todas las llamadas a la API:

```javascript
import { api } from '$lib/utils/api.js';

// Obtener configuración
const config = await api.getConfig();

// Obtener menú
const menu = await api.getMenu();

// Crear reserva
const reservation = await api.createReservation(data);
```

### Manejo de Errores

Todas las llamadas a la API incluyen manejo de errores con fallback a datos por defecto.

## 📦 Build y Producción

### Build para Producción

```powershell
npm run build
```

### Preview de Build

```powershell
npm run preview
```

### Deploy con Docker

El proyecto usa `@sveltejs/adapter-node` para generar un servidor Node.js:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "build"]
```

## 🧪 Testing

```powershell
# Check de tipos y sintaxis
npm run check

# Linting
npm run lint

# Formateo de código
npm run format
```

## 🔧 Configuración Avanzada

### CORS

Asegúrate de que el backend tenga configurado CORS para el dominio del frontend:

```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Desarrollo
    "https://www.kvernicola.cl",  # Producción
]
```

### Variables de Entorno

Variables disponibles con prefijo `PUBLIC_`:
- `PUBLIC_API_URL`: URL base de la API del backend

Acceso en código:
```javascript
import { PUBLIC_API_URL } from '$env/static/public';
```

## 📝 Convenciones de Código

- **Naming**: camelCase para variables, PascalCase para componentes
- **Archivos**: kebab-case para nombres de archivo
- **Rutas**: kebab-case para URLs
- **Commits**: Conventional Commits

## 🚧 TODO

- [ ] Implementar menú móvil responsive
- [ ] Agregar animaciones con Svelte transitions
- [ ] Implementar lazy loading de imágenes
- [ ] Crear sitemap.xml dinámico
- [ ] Agregar modo oscuro
- [ ] Implementar Progressive Web App (PWA)
- [ ] Optimizar imágenes con sharp
- [ ] Tests unitarios con Vitest
- [ ] Tests E2E con Playwright

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Versión**: 1.0.0  
**Framework**: SvelteKit 1.27+  
**Node**: 18+  
**Última actualización**: Octubre 2025

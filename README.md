# U-Voluntapp Web - Frontend

## Descripción
Aplicación frontend moderna para gestión de programas y actividades de voluntariado. Permite a voluntarios, coordinadores y administradores colaborar de manera eficiente en iniciativas de impacto social.

## Stack Tecnológico
- **React 18** con TypeScript para tipado estricto
- **Vite** como empaquetador ultrarrápido
- **React Router DOM** para enrutamiento SPA
- **Zustand** para estado global persistente
- **Axios** para peticiones HTTP
- **Tailwind CSS** para estilos
- **Lucide React** para iconografía

## Arquitectura

```
src/
├── service/              # Capa global de servicios
│   ├── api/             # Cliente HTTP (apiClient, auth)
│   ├── hooks/           # Hooks reutilizables (useFetch, useForm)
│   └── types/           # Tipos globales
├── modules/             # Módulos por rol
│   ├── admin/
│   ├── coordinator/
│   └── volunteer/
├── utils/               # Utilidades transversales
│   ├── exceptions/      # Manejo de errores
│   ├── validations/     # Validaciones
│   ├── store/           # Zustand stores
│   └── router/          # Route guards
├── components/          # Componentes compartidos
└── pages/               # Páginas globales (Auth)
```

### Patrón de Módulos
Cada módulo (admin, coordinator, volunteer) contiene:
```
module/
├── service/
│   ├── api/            # Definiciones de endpoints
│   ├── types/          # Tipos TypeScript del módulo
│   └── hooks/          # Hooks de data fetching
├── components/         # Componentes reutilizables
└── pages/             # Páginas del módulo
```

## Instalación

### Requisitos
- Node.js 18+ 
- npm o pnpm

### Pasos

1. **Clonar repositorio**
   ```bash
   git clone https://github.com/henrrycoronado/U-voluntapp.git
   cd U-voluntapp/U-voluntapp_web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Configurar variables de entorno**
   - Copiar `.env.example` a `.env.local` (si existe)
   - Configurar `VITE_API_BASE_URL` pointing to backend (default: `http://localhost:5000`)

   ```bash
   echo "VITE_API_BASE_URL=http://localhost:5000" > .env.local
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   # Abrirá http://localhost:5173
   ```

5. **Build para producción**
   ```bash
   npm run build
   npm run preview  # Preview del build
   ```

## Desarrollo

### Comandos Disponibles
```bash
npm run dev       # Servidor desarrollo (Vite)
npm run build     # Build optimizado
npm run preview   # Preview del build
npm run lint      # ESLint check
npm run lint:fix  # ESLint auto-fix
```

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
refactor: reorganización sin cambios funcionales
chore: tareas administrativas
docs: documentación
```

## Flujo de Autenticación

1. **Login**: POST `/api/v1/auth/login` → JWT + User profile
2. **Persistencia**: Token almacenado en Zustand (authStore)
3. **Protección**: ProtectedRoute verifica token y rol
4. **Auto-logout**: Token expirado dispara redirect a login

## API Endpoints

Base: `http://localhost:5000/api/v1/`

### Públicos (Sin Auth)
- `POST /auth/register` - Registro
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout

### Autenticados
- `GET /profiles/me` - Perfil del usuario
- `GET /programs` - Listar programas (filtrado por rol)
- `GET /activities/by-program/{id}` - Actividades de programa
- `GET /enrollments/mine` - Mis inscripciones
- `POST /enrollments` - Inscribirse en actividad
- `PATCH /enrollments/{id}/review` - Revisar inscripción (Coordinador/Admin)
- Y más según rol...

Documentación completa en [API_ENDPOINTS_ANALYSIS.md](/memories/repo/API_ENDPOINTS_ANALYSIS.md)

## Roles y Permisos

### Voluntario
- Navegar programas y actividades
- Inscribirse en actividades
- Gestionar su perfil
- Solicitar rol de coordinador

### Coordinador
- Crear/editar programas y actividades
- Revisar inscripciones de voluntarios
- Generar reportes básicos
- Solicitar rol de administrador

### Administrador
- Aprobar/rechazar solicitudes de rol
- Acceso a reportes avanzados
- Gestionar todos los programas y actividades
- Administrar usuarios

## Desarrollo de Nuevas Funcionalidades

### Crear un Hook de Data Fetching
```typescript
// module/service/hooks/useMyData.ts
import { useFetch } from '../../../../service/hooks/useFetch';
import { moduleApi } from '../api/moduleApi';

export function useMyData() {
  return useFetch(() => moduleApi.getMyData());
}
```

### Crear un Endpoint API
```typescript
// module/service/api/moduleApi.ts
export const moduleApi = {
  getMyData: () => 
    apiClient.get<MyDataType>('/api/v1/endpoint'),
};
```

### Crear un Componente Reutilizable
```typescript
// module/components/MyComponent.tsx
import { Card, Button, Input } from '../../../components';

interface MyComponentProps {
  data: any;
  onSubmit: (value: any) => void;
}

export function MyComponent({ data, onSubmit }: MyComponentProps) {
  return (
    <Card>
      {/* Componente JSX */}
    </Card>
  );
}
```

## Troubleshooting

### "Module not found" imports
- Verificar rutas relativas con escalas correctas `../../../service/`
- Usar barrel exports (`index.ts`) para simplificar imports

### CORS errors
- Backend debe estar corriendo en puerto 5000
- Verificar CORS settings en backend

### Token expirado
- Login automático redirige a `/login`
- Revisar localStorage para token persistencia

## Estructura de Estado Global

### authStore (Zustand)
```typescript
{
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  role: 'volunteer' | 'coordinator' | 'admin'
  setUser: (user: UserProfile) => void
  logout: () => void
}
```

### themeStore (Zustand)
```typescript
{
  isDark: boolean
  toggle: () => void
}
```

## Performance

- **Lazy loading** de módulos por ruta
- **Code splitting** automático con Vite
- **Memoization** de componentes en listas
- **Request deduplication** con hooks reutilizables

## Contribución

1. Crear rama desde `develop`: `git checkout -b feature/tu-feature`
2. Hacer commits atómicos
3. Push a rama
4. Crear Pull Request a `develop`
5. Esperar review

## Roadmap

- [ ] Componentes adicionales (DataGrid, DatePicker, etc.)
- [ ] Temas dinámicos avanzados
- [ ] Notificaciones en tiempo real
- [ ] Offline support
- [ ] PWA capabilities

## Licencia

MIT

## Contacto

Equipo de desarrollo: [tu-email@example.com]
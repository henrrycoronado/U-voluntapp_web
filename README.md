# U-Voluntapp Web - Frontend

## Descripción

Aplicación frontend moderna para gestión de programas y actividades de voluntariado de la Universidad Católica Boliviana (UCB). Permite a voluntarios, coordinadores y administradores colaborar de manera eficiente en iniciativas de impacto social.

---

## Stack Tecnológico

- **React 18** con TypeScript para tipado estricto
- **Vite** como empaquetador ultrarrápido
- **React Router DOM** para enrutamiento SPA
- **Zustand** para estado global persistente (Token JWT y Sesión)
- **Axios** con interceptores para peticiones HTTP
- **Tailwind CSS** para estilos e interfaces responsivas
- **Lucide React** para iconografía moderna

---

## Arquitectura (Domain-Driven Design)

El proyecto ha sido refactorizado hacia una arquitectura orientada a dominios (`features`), eliminando la segmentación por roles para promover la reutilización de código mediante renderizado condicional.

```text
src/
├── app/                  # Configuración global e inicialización
│   ├── store/            # State Management Global (Zustand)
│   │   └── authStore.ts
│   └── providers/        # Proveedores de contexto
│
├── shared/               # Recursos globales reutilizables
│   ├── components/       # UI genérica (Button, Modal, Table, Sidebar)
│   ├── hooks/            # Hooks reutilizables
│   └── services/         # Cliente HTTP centralizado (Axios)
│
├── features/             # Módulos de negocio agrupados por dominio
│   ├── programas/
│   ├── actividades/
│   └── miembros/
│
├── routes/
│   └── GuardRole.tsx     # Protección de rutas por claims y roles
│
└── App.tsx               # Contenedor principal del router
```

### Patrón por Feature

Cada dominio dentro de `features/` es autónomo y contiene su propia lógica:

```text
features/nombre-del-dominio/
├── hooks/      # Hooks específicos del dominio
├── services/   # Llamadas HTTP usando Axios
└── views/      # Pantallas inteligentes y renderizado condicional
```

---

## Instalación y Despliegue

### Requisitos

- Node.js 18+
- npm o pnpm

### Pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/henrrycoronado/U-voluntapp.git
cd U-voluntapp_web
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y configura la URL del backend.

```env
VITE_API_BASE_URL=http://localhost:5277
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---


## Roles y Renderizado Condicional

Las interfaces se adaptan dinámicamente según los permisos almacenados en `authStore`.

### Voluntario

- Acceso de lectura
- Inscripción a programas y actividades

### Coordinador

- Gestión de programas propios
- Creación y administración de actividades

### Administrador

- Acceso global al sistema
- Gestión de usuarios
- Aprobación de solicitudes y reportes

---

## Desarrollo y Contribución

### Flujo Git (GitFlow Simplificado)

```bash
# Crear rama desde develop
git checkout -b feature/nombre-del-cambio

# Commit usando Conventional Commits
git commit -m "feat: agrega formulario de actividades"

# Subir cambios
git push origin feature/nombre-del-cambio
```

### Convención de Commits

| Prefijo | Descripción |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de errores |
| `refactor:` | Reestructuración sin cambios funcionales |
| `chore:` | Tareas administrativas o dependencias |

---

## Equipo de Desarrollo

Proyecto desarrollado para la materia de **Aplicaciones Web II** — Séptimo Semestre.

---
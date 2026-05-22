# U-Voluntapp Web - Frontend

## Description

Modern frontend application for managing volunteer programs and activities at Universidad Católica Boliviana (UCB). It enables volunteers, coordinators, and administrators to collaborate efficiently on social impact initiatives.

---

## Tech Stack

- **React 18** with TypeScript for strict typing
- **Vite** as an ultra-fast build tool
- **React Router DOM** for SPA routing
- **Zustand** for persistent global state management (JWT Token and Session)
- **Axios** with interceptors for HTTP requests
- **Tailwind CSS** for responsive UI styling
- **Lucide React** for modern iconography

---

## Architecture (Domain-Driven Design)

The project was refactored into a domain-oriented architecture (`features`), removing role-based segmentation to encourage code reuse through conditional rendering.

```text
src/
├── app/                  # Global configuration and initialization
│   ├── store/            # Global State Management (Zustand)
│   │   └── authStore.ts
│   └── providers/        # Context providers
│
├── shared/               # Reusable global resources
│   ├── components/       # Generic UI (Button, Modal, Table, Sidebar)
│   ├── hooks/            # Reusable hooks
│   └── services/         # Centralized HTTP client (Axios)
│
├── features/             # Business modules grouped by domain
│   ├── programas/
│   ├── actividades/
│   └── miembros/
│
├── routes/
│   └── GuardRole.tsx     # Route protection based on claims and roles
│
└── App.tsx               # Main router container
```

### Feature Pattern

Each domain inside `features/` is self-contained and includes its own business logic:

```text
features/domain-name/
├── hooks/      # Domain-specific hooks
├── services/   # HTTP calls using Axios
└── views/      # Smart views and conditional rendering
```

---

## Installation and Deployment

### Requirements

- Node.js 18+
- npm or pnpm

### Steps

### 1. Clone the repository

```bash
git clone https://github.com/henrrycoronado/U-voluntapp.git
cd U-voluntapp_web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the `.env.example` file into `.env` and configure the backend URL.

```env
VITE_API_BASE_URL=http://localhost:5277
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Roles and Conditional Rendering

Interfaces dynamically adapt according to the permissions stored in `authStore`.

### Volunteer

- Read-only access
- Program and activity enrollment

### Coordinator

- Management of assigned programs
- Creation and administration of activities

### Administrator

- Full system-wide access
- User management
- Approval of requests and reports

---

## Development and Contribution

### Git Workflow (Simplified GitFlow)

```bash
# Create branch from develop
git checkout -b feature/change-name

# Commit using Conventional Commits
git commit -m "feat: add activity form"

# Push changes
git push origin feature/change-name
```

### Commit Convention

| Prefix | Description |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Architectural restructuring without functional changes |
| `chore:` | Administrative tasks or dependency updates |

---

## Development Team

Project developed for the course **Aplicaciones Web II** — Seventh Semester.

---
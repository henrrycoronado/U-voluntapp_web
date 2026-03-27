# U-Voluntapp - Frontend

## Descripción del proyecto
U-Voluntapp es una aplicación cliente (frontend) de un sistema integral diseñado para la gestión y conexión entre voluntarios y programas de voluntariado. Su propósito es facilitar la administración de actividades, el registro de usuarios y la asignación de roles mediante una interfaz moderna, escalable y centrada en la experiencia del usuario.

## Tecnologías utilizadas
El proyecto fue construido utilizando un ecosistema basado en React, priorizando el tipado estricto y la gestión eficiente del estado y las peticiones de red.

* Librería principal: React 18
* Lenguaje: TypeScript
* Empaquetador: Vite
* Enrutamiento: React Router DOM
* Gestión del estado global: Zustand (con middleware de persistencia)
* Gestión de peticiones: TanStack Query (React Query)
* Estilos: CSS puro bajo la metodología BEM
* Iconografía: Lucide React
* Simulación de base de datos: JSON Server

## Arquitectura y estructura
El proyecto sigue una arquitectura orientada a funcionalidades (Feature-Driven), lo que permite escalar el código encapsulando la lógica, las vistas y las llamadas a la API dentro de sus respectivos dominios.

* src/features/: Contiene los módulos principales de la aplicación divididos por dominio de negocio.
* src/store/: Contiene los manejadores de estado global.
* src/components/: Componentes compartidos y centralizados.
* src/assets/: Recursos estáticos.

## Hitos de evaluación (Semana 4 y 5)
El proyecto cumple rigurosamente con los requerimientos técnicos establecidos en la rúbrica académica:

**Semana 4:**
* Rutas protegidas implementadas: Se utiliza un componente contenedor que verifica la sesión activa en el estado global y redirige al login si el usuario no cuenta con autorización o el rol adecuado.
* Hooks y stores reutilizables: Extracción de la lógica de peticiones en hooks personalizados (usePrograms) y centralización de la sesión mediante Zustand (useAuthStore).
* Manejo de estados de carga y error: Control estricto de las variables de estado asíncrono en las vistas principales.

**Semana 5:**
* Conexión a API simulada: El frontend consume operaciones reales de red hacia un servidor local levantado con JSON Server, cumpliendo con la cuota de endpoints funcionales.
* Configuración de TanStack Query: Implementado como cliente HTTP principal para optimizar el data fetching y la caché.
* Skeletons de carga: Creación e implementación de un componente reutilizable y centralizado (SkeletonList) para mostrar animaciones de carga estructurales mientras se resuelven las peticiones de red.
* Manejo de errores visuales: Captura y renderizado de mensajes de error directamente en la interfaz de usuario en caso de fallos de conexión.
* Mutaciones con invalidación de caché: Implementación de operaciones de creación y eliminación que ejecutan la invalidación de las consultas activas, actualizando la interfaz en tiempo real sin recargar el navegador.

## Instrucciones de instalación y ejecución
Para ejecutar este proyecto en un entorno local, se requiere tener Node.js instalado.

1. Clonar el repositorio en la máquina local.
2. Abrir una terminal en el directorio raíz del proyecto.
3. Instalar todas las dependencias ejecutando el comando:
   **`npm install`**
4. En la misma terminal, iniciar el servidor de desarrollo:
   **`npm run dev`**
5. Abrir una nueva terminal (manteniendo la anterior abierta) e iniciar el servidor de base de datos simulada:
   **`npx json-server --watch db.json --port 3000`**

## Estado de integración
Actualmente, el frontend opera de manera autónoma utilizando JSON Server. El manejo de estado global ha sido tipado y estructurado para recibir el objeto de transferencia de datos (DTO) proveniente de la integración inminente con la API RESTful construida en .NET.
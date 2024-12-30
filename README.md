# Task Manager

## Descripción

Task Manager es una aplicación de gestión de tareas que permite a los usuarios crear, leer, actualizar y eliminar tareas. Los usuarios también pueden marcar las tareas como completadas o pendientes, todo a través de una interfaz intuitiva y moderna.

## Enlace a la aplicación desplegada

Puedes acceder a la aplicación desplegada en Vercel en el siguiente enlace:

[**Enlace a la aplicación desplegada**](https://tu-enlace-desplegado.com)

## Tecnologías usadas

- **Frontend:**
  - Node.js (v18)
  - React.js
  - TypeScript
  - Axios
  - Tailwind css
  - Testing Library
  - Vercel

## Pasos para instalar y ejecutar el proyecto localmente

### 1. Clonar el repositorio

Primero, clona el repositorio del proyecto:

```bash
git clone https://github.com/Neider-Urbano/task_manager_ui.git
cd task_manager_ui
```

### 2. Instalar las dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

### 3. Configurar las variables de entorno

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

```bash
VITE_API_URL="http://localhost:3000"
```

- VITE_API_URL: La URL de conexión a tu servidor del projecto. Si estás utilizando tu cliente localmente, puedes dejarla como http://localhost:3000.

### 4. Ejecutar el proyecto

Para levantar el cliente de desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```

Esto iniciará el cliente de forma local en http://localhost:5173.

### 5. Comandos para ejecutar pruebas

Para ejecutar las pruebas unitarias utilizando React Testing Library, utiliza el siguiente comando:

```bash
npm run test
```

Esto ejecutará Jest y mostrará los resultados de las pruebas en la terminal.

## Detalles de configuración

- Next UI: Se utiliza Next UI para mejorar la interfaz de usuario con componentes modernos y personalizables.
- React Router Dom: El proyecto utiliza React Router para la navegación entre las diferentes vistas de la aplicación.
- Custom Hooks: Se hace uso de hooks personalizados para gestionar estados y lógica reutilizable en los componentes.
- TypeScript: El proyecto está desarrollado en TypeScript para aprovechar sus beneficios de tipado estático, lo que mejora la seguridad y robustez del código.

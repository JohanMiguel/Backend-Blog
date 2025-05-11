# 📚 API de Publicaciones - Estudiantes de INFORMÁTICA

Esta API permite a los usuarios ver, crear y gestionar publicaciones realizadas por estudiantes de la carrera de INFORMÁTICA. Incluye autenticación, administración de cursos, publicaciones y comentarios.

---

## 📑 Tabla de Contenidos

- [Descripción](#descripción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Usuario Administrador por Defecto](#usuario-administrador-por-defecto)
- [Rutas Principales](#rutas-principales)
- [Documentación Swagger](#documentación-swagger)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## 📝 Descripción

Esta API ofrece las siguientes funcionalidades:

- Crear, actualizar, eliminar y listar publicaciones.
- Gestionar comentarios en las publicaciones.
- Administrar cursos y sus publicaciones asociadas.
- Autenticación y autorización de usuarios para proteger el acceso.

---

## 🗂️ Estructura del Proyecto

\`\`\`
/controllers      -> Controladores de lógica de negocio
/routes           -> Definición de rutas
/models           -> Modelos de datos (Mongoose)
/middlewares      -> Middlewares personalizados
/config           -> Conexión a la base de datos y configuraciones
/app.js           -> Configuración principal de Express
/server.js        -> Punto de entrada del servidor
\`\`\`

---

## ⚙️ Instalación

1. Clona este repositorio:
   \`\`\`bash
   git clone https://github.com/JohanMiguel/Backend-Blog.git
   cd nombre-del-repo
   \`\`\`

2. Instala las dependencias:
   \`\`\`bash
   npm i
   \`\`\`

3. Crea un archivo \`.env\` en la raíz del proyecto con el siguiente contenido:

   \`\`\`env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/blog
   JWT_SECRET=mi_clave_super_secreta
   \`\`\`

4. Inicia el servidor:
   \`\`\`bash
   npm start
   \`\`\`

---

## 👤 Usuario Administrador por Defecto 
## 👤 Se implementa Para mayor seguridad al momento de queres gestinar acciones sencibles

Al iniciar el servidor por primera vez, se crea automáticamente un usuario administrador con estas credenciales:

- **Usuario:** \`admin_role\`
- **Contraseña:** \`Johan2006$sin\`

Este usuario tiene permisos de administración completos para gestionar todos los recursos.

---

## 🚀 Rutas Principales

### 🔐 Autenticación

- \`POST /blog/v1/auth/login\`: Iniciar sesión con usuario y contraseña.

### 👥 Usuarios

- \`GET /blog/v1/user\`: Gestión de usuarios *(pendiente de implementación)*.

### 📚 Cursos

- \`GET /blog/v1/course\`: Lista todos los cursos.
- \`GET /blog/v1/coursefiltro/{name}\`: Obtiene un curso por nombre con sus publicaciones.

### 📝 Publicaciones

- \`POST /blog/v1/post/publicarPost\`: Crear una nueva publicación.
- \`GET /blog/v1/post\`: Listar todas las publicaciones.
- \`GET /blog/v1/post/buscar/{post_id}\`: Obtener publicación por ID.
- \`PUT /blog/v1/post/updatePost/{post_id}\`: Actualizar una publicación.
- \`DELETE /blog/v1/post/deletePost/{post_id}\`: Eliminar una publicación.

### 💬 Comentarios

- \`POST /blog/v1/comentario/addComment\`: Agregar comentario a una publicación.

---

## 📄 Documentación Swagger

La API incluye documentación interactiva generada con Swagger.  
Una vez iniciado el servidor, puedes acceder desde:

🔗 [http://127.0.0.1:3001/api-docs](http://127.0.0.1:3001/api-docs)

---

## 🛠️ Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución para JavaScript.
- **Express:** Framework para la creación del servidor.
- **MongoDB:** Base de datos NoSQL.
- **Mongoose:** ODM para la gestión de MongoDB.
- **Swagger:** Generador de documentación de APIs.
- **Helmet:** Protección de cabeceras HTTP.
- **JWT:** Autenticación mediante JSON Web Tokens.
- **argon2:** Encriptación de contraseñas.

---

> Desarrollado con Johan Tojin 2020591 
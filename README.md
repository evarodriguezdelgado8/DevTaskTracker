# 🚀 DevTask Tracker

Gestor de tareas fullstack diseñado para desarrolladores. Permite organizar tareas pendientes, categorizarlas por tecnología y mantener un histórico de tareas completadas.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3 (Variables, Flexbox, Animaciones), JavaScript (Vanilla ES6+).
* **Backend:** Node.js, Express.
* **Base de Datos:** MongoDB.
* **Herramientas:** Fetch API para la comunicación cliente-servidor.

## ✨ Funcionalidades

1.  **CRUD Completo:** Crear, Leer, Actualizar y Borrar tareas.
2.  **Filtrado Visual:** Distinción clara entre tareas pendientes y completadas.
3.  **Categorización:** Etiquetas visuales según la tecnología (JS, Java, Python, etc.).
4.  **Interfaz Reactiva:**
    * Animaciones al añadir tareas.
    * **Modal de confirmación** personalizado para evitar borrados accidentales.
    * Diseño adaptable (Responsive) y tema oscuro (Dark Mode).
5.  **Persistencia:** Los datos se guardan en MongoDB.

## 🔧 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/devtask-tracker.git](https://github.com/tu-usuario/devtask-tracker.git)
    cd devtask-tracker
    ```

2.  **Instalar dependencias del backend:**
    ```bash
    npm install
    ```

3.  **Configuración:**
    * Crea un archivo `.env` en la raíz del servidor.
    * Añade tu cadena de conexión de MongoDB Atlas:
        ```env
        MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/devtask
        ```
    * Asegúrate de tener MongoDB ejecutándose localmente o configura tu URI en el archivo `.env` (si aplica).

5.  **Arrancar el servidor:**
    ```bash
    npm start
    # O si usas nodemon:
    npm run dev
    ```

6.  **Abrir la aplicación:**
    * Abre `index.html` en tu navegador o visita `http://localhost:3000` (según tu configuración de servidor estático).

## 🗄️ Estructura de la Base de Datos (MongoDB)

El esquema de las tareas sigue esta estructura JSON:

```json
{
  "_id": "ObjectId('...')",
  "titulo": "Aprender React",
  "descripcion": "Ver tutoriales básicos",
  "tecnologia": "JS",
  "estado": "pending", // o "done"
  "fecha": "2023-10-27T10:00:00.000Z"
}

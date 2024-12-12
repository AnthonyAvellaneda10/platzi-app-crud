# Platzi Fake Store - Aplicación CRUD

## 🌐 Demo
[Ver aplicación en vivo 👀](https://platzi-app-crud.vercel.app)

## 📝 Descripción
Una aplicación web desarrollada con Angular que permite gestionar productos a través de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando la API de Platzi Fake Store.

## ✨ Características Principales

### 📋 Listado de Productos
- **Listado**: Visualización de productos en una tabla con:
  - Nombre y imagen del producto
  - Precio
  - Descripción
  - Categoría
  - Acciones disponibles
- **Paginación**: Navegación entre páginas de productos
- **Manejo de imágenes**: Sistema de fallback automático para imágenes rotas

### 🔍 Búsqueda
- Búsqueda en tiempo real por nombre de producto
- Feedback visual durante la búsqueda
- Manejo de estados sin resultados

### ✏️ Operaciones CRUD
- **Crear**: Formulario para añadir nuevos productos
- **Editar**: Modificación de productos existentes
- **Eliminar**: Eliminación con modal de confirmación
- **Validaciones**:
  - Campos obligatorios
  - Longitud mínima para nombres (3 caracteres)
  - Longitud mínima para descripciones (10 caracteres)
  - Precio mínimo mayor a 0
  - URLs de imágenes válidas

### 🎨 Interfaz de Usuario
- Diseño responsive con Tailwind CSS
- Notificaciones para feedback de operaciones
- Modales para confirmaciones
- Skeleton loader para estados de carga
- Estados vacíos y de error manejados

## 🛠️ Tecnologías Utilizadas
- Angular 18
- TypeScript
- Tailwind CSS
- RxJS
- API REST

## 🚀 Instalación y Uso

1. Clonar el repositorio

```bash
git clone https://github.com/AnthonyAvellaneda10/platzi-app-crud.git
```

2. Instalar dependencias

```bash
npm install
```

3. Iniciar el servidor de desarrollo

```bash
npm start
```

4. Abrir en el navegador
```
http://localhost:4200
```

## 🔧 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm test`: Ejecuta los tests
- `npm run watch`: Construye en modo watch

## 🌐 API
La aplicación consume la API de Platzi Fake Store:
- Base URL: `https://api.escuelajs.co/api/v1/`
- Endpoints utilizados:
  - GET /products
  - GET /products?title={title}
  - POST /products
  - PUT /products/{id}
  - DELETE /products/{id}
  - GET /categories

## 👥 Contribución
Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Empuja a la rama
5. Abre un Pull Request

## 🙋‍♂️ Autor
Desarrollado por [Anthony AP](https://portafolio-anthony-avellaneda.vercel.app/)


## Pantalla
![Pantalla 1](./public/assets/mockup.png)
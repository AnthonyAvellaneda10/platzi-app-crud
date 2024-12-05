# Platzi Fake Store - Aplicación CRUD

## 📝 Descripción
Una aplicación web desarrollada con Angular que permite gestionar productos a través de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando la API de Platzi Fake Store.

## ✨ Características Principales

### 📋 Listado de Productos
- Visualización de productos en una tabla con detalles como:
  - Nombre del producto
  - Precio
  - Descripción
  - Categoría
  - Imagen del producto
- Manejo de imágenes con fallback automático

### 🔍 Búsqueda
- Búsqueda en tiempo real de productos por nombre
- Interfaz intuitiva con feedback visual

### ✏️ Gestión de Productos
- **Crear**: Añadir nuevos productos con validación de formularios
- **Editar**: Modificar productos existentes
- **Eliminar**: Eliminar productos con confirmación
- **Validaciones**: 
  - Campos requeridos
  - Longitud mínima para nombres y descripciones
  - Precio mínimo
  - URLs de imágenes válidas

### 🎨 Interfaz de Usuario
- Diseño responsive con Tailwind CSS
- Notificaciones para feedback de operaciones
- Modales para confirmaciones
- Loader para estados de carga
- Manejo de estados vacíos

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

## 📄 Licencia
Este proyecto está bajo la Licencia MIT.

## 🙋‍♂️ Autor
Desarrollado por Anthony AP
```

Este README proporciona una visión completa de tu aplicación, incluyendo sus características, tecnologías utilizadas, instrucciones de instalación y uso, y otra información relevante para desarrolladores que quieran entender o contribuir al proyecto.

¿Te gustaría que ajustemos alguna sección o agreguemos información adicional?
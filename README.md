# 📚 Library System - Prueba Técnica

Este proyecto es un sistema de gestión de biblioteca desarrollado con **.NET Core 8** en el backend y **ReactJS** en el frontend.

---

##Link del proyecto:  https://LibrarySystem638.netlify.app

## ⚡ Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

### **Backend** (API en .NET Core 8)
- **.NET 8 SDK** → [Descargar aquí](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- **SQL Server** o **MariaDB/MySQL** para la base de datos
- **Entity Framework Core CLI**

### **Frontend** (Aplicación React)
- **Node.js v18+** → [Descargar aquí](https://nodejs.org/)
- **npm (Node Package Manager)** → Se instala junto con Node.js

---

## 🚀 Instalación y Configuración

### **1️⃣ Clonar el Repositorio**
```bash
# Clonar el repositorio
git clone https://github.com/tu-repositorio/library-system.git
cd library-system
```

### **2️⃣ Configurar el Backend (.NET Core)**

#### **📌 Instalar las dependencias**
```bash
cd LibrarySystem.Api # Ir al backend
```
```bash
dotnet restore
```

#### **📌 Configurar `appsettings.json`**
1. **Crea y edita el archivo `appsettings.Development.json` en `LibrarySystem.Api`**
2. **Agrega la cadena de conexión a tu base de datos**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=LibraryDB;User Id=tu_usuario;Password=tu_contraseña;"
  },
  "Jwt": {
    "Key": "tu_clave_secreta_para_jwt",
    "Issuer": "YourApp",
    "Audience": "YourAppUsers"
  }
}
```

#### **📌 Crear la Base de Datos**
Ejecuta el siguiente comando para aplicar las migraciones:
```bash
dotnet ef database update
```

#### **📌 Iniciar el Backend**
```bash
dotnet run
```
El backend se ejecutará en: [http://localhost:5000](http://localhost:5000) (o `https://localhost:5001` para HTTPS)

---

### **3️⃣ Configurar el Frontend (ReactJS)**

#### **📌 Instalar dependencias**
```bash
cd LibrarySystemApp # Ir al frontend
npm install
```

#### **📌 Configurar Variables de Entorno**
Crea un archivo **`.env`** en la raíz del frontend con la URL del backend:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### **📌 Iniciar el Frontend**
```bash
npm start
```
El frontend se ejecutará en: [http://localhost:3000](http://localhost:3000)

---

## ✅ Desplegar en Netlify

Puedes desplegar el frontend en Netlify de manera rápida siguiendo estos pasos:

### **1️⃣ Instalar Netlify CLI**
Si no lo tienes instalado, ejecuta:
```bash
npm install -g netlify-cli
```

### **2️⃣ Construir la Aplicación**
Antes de subir la aplicación, compila el proyecto para producción:
```bash
npm run build
```
Esto generará una carpeta `build/` con los archivos estáticos necesarios.

### **3️⃣ Iniciar Sesión en Netlify CLI**
```bash
netlify login
```

### **4️⃣ Desplegar en Netlify**
Ejecuta este comando en la raíz del proyecto:
```bash
netlify deploy --prod --dir=build
```
Si es la primera vez, Netlify te pedirá que crees un nuevo sitio.

### **5️⃣ Configurar Variables de Entorno en Netlify**
Si usas variables como `REACT_APP_API_URL`, agrégalas en **Netlify Dashboard**:
1. Ve a **Netlify > Site Settings > Environment Variables**.
2. Agrega cada variable con su valor (Ejemplo: `REACT_APP_API_URL = https://tu-api.com`).
3. Guarda y vuelve a hacer deploy.

### **6️⃣ Obtener la URL de Producción**
Una vez desplegado, Netlify te dará una URL como:
```
https://tu-sitio.netlify.app
```
Puedes personalizarla desde **Site Settings > Domain Management**.

---

## 👤 Creación de Usuario con Roles
Para acceder a la administración de **usuarios y reportes**, debes crear un usuario con un rol diferente a "User":

1. **Regístrate en la app** (desde `/register`).
2. **En la base de datos, cambia el rol** a `Librarian` o `Admin` en la tabla `Users`.
3. **Inicia sesión** y verás las opciones de administración.

---

## ✅ Pruebas Automatizadas

### **📌 Backend (Pruebas con XUnit y FluentAssertions)**
Para ejecutar las pruebas del backend, ve al directorio `LibrarySystem.Api` y ejecuta:
```bash
dotnet test
```

### **📌 Frontend (Pruebas con Jest y React Testing Library)**
Para ejecutar las pruebas del frontend, usa:
```bash
npm test
```
Si solo deseas probar un servicio específico:
```bash
npm test -- src/features/auth/authService.test.js
```

---

## 🛠 Tecnologías Usadas

### **Backend**
- **.NET Core 9**
- **Entity Framework Core 8**
- **MySQL/MariaDB o SQL Server**
- **AutoMapper**
- **JWT Authentication**

### **Frontend**
- **ReactJS** (Vite o Create React App)
- **React Router DOM**
- **Axios**
- **Bootstrap o Material-UI**
- **Jest & React Testing Library**

---

## 📌 Notas Finales
- **Asegúrate de correr `update-database` antes de iniciar el backend.**
- **Para ver los módulos de usuario y reportes, usa un usuario con rol diferente a `User`.**
- **Si hay errores en las pruebas de Jest, revisa `jest.config.js`.**

💡 **Listo! Ahora puedes gestionar tu sistema de biblioteca! 🚀**


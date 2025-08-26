# Paso 1 - Autenticación (Backend)

## 🌟 Objetivo

Implementar el sistema de autenticación para empresas (usuarios administradores):

1. Registro: `POST /api/register`
2. Login: `POST /api/login`
3. Verificación de sesión: `GET /api/me` (requiere token JWT)

---

## 🔹 Tecnologías utilizadas

* **Node.js + Express**
* **MongoDB Atlas + Mongoose**
* **bcrypt** (hash de contraseñas)
* **jsonwebtoken (JWT)**
* **dotenv**
* **Thunder Client** para pruebas

---

## 📂 Estructura creada

```
backend/
├── controllers/
│   └── authController.js
├── middleware/
│   └── auth.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
```

---

## 📅 Descripción de los archivos

### `models/User.js`

Esquema del usuario administrador:

* email (obligatorio, único)
* password (hash con bcrypt)
* nombre\_empresa (obligatorio)
* logo (opcional)
* sucursales (referencia a otras entidades)

---

### `controllers/authController.js`

#### `registerUser`

* Verifica que el email no esté en uso
* Hashea la contraseña
* Crea el usuario
* Devuelve un JWT

#### `loginUser`

* Verifica que el email exista
* Compara la contraseña con bcrypt
* Devuelve un JWT si es válida

#### `getMe`

* Protegido por token JWT
* Devuelve datos del usuario actual

---

### `middleware/auth.js`

* Valida que se incluya `Authorization: Bearer <token>`
* Verifica el token
* Busca el usuario
* Lo inyecta en `req.user`

---

### `routes/authRoutes.js`

Rutas disponibles:

* `POST /api/register` → Registro
* `POST /api/login` → Login
* `GET /api/me` → Obtener datos del usuario autenticado

---

## 🚪 Endpoint protegido

`GET /api/me` solo funciona si se incluye un token JWT válido en el header:

```
Authorization: Bearer <token>
```

---

## 💡 Estado final del Paso 1

1. Registro funcional con JWT
2. Login con validación de credenciales
3. Middleware JWT funcionando
4. Endpoint protegido `/api/me`
5. Probado con Thunder Client

---

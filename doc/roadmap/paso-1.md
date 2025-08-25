# 🧩 Paso 1 — Autenticación (v1.0)

Este paso implementa el sistema de autenticación de empresas (usuarios administradores del sistema), cubriendo registro, login, almacenamiento de sesión y protección del panel admin.

---

## 🎯 Objetivo

Permitir que una empresa pueda:

- Registrarse en el sistema.
- Iniciar sesión y recibir un token JWT.
- Mantener sesión autenticada.
- Acceder solo a las rutas privadas protegidas por token.

---

## 📦 Tecnologías usadas

| Parte      | Tecnología                   |
|------------|------------------------------|
| Backend    | Node.js, Express, Mongoose   |
| Seguridad  | bcrypt, JWT, express-validator |
| Frontend   | React, React Router, Context API |
| Estado     | Context / Zustand             |

---

## ✅ Checklist de tareas

### 🔧 Backend

- [ ] Modelo `Usuario` / `Empresa`
- [ ] Endpoint `POST /api/register`
- [ ] Endpoint `POST /api/login`
- [ ] Endpoint `GET /api/me`
- [ ] Middleware de autenticación (`authMiddleware`)
- [ ] Validaciones con `express-validator`
- [ ] Hash de contraseña con `bcrypt`
- [ ] Tests mínimos con Thunder Client / Postman

### 🎨 Frontend

- [ ] Página `/admin/login`
- [ ] Página `/admin/register`
- [ ] Contexto global `authContext` con `usuario` y `authToken`
- [ ] Guard de rutas privadas (`PrivateRoute`)
- [ ] Almacenamiento del token en `localStorage`
- [ ] Logout (limpiar estado y token)

---

## 🔐 Detalles de seguridad

- JWT firmado con clave en `.env`: `JWT_SECRET`
- Tokens enviados por header: `Authorization: Bearer <token>`
- Validación en todas las rutas `/api/*` protegidas
- Expiración del token opcional (por agregar en futuro)

---

## 🧪 Tests mínimos esperados

- [ ] Registro: rechaza emails duplicados
- [ ] Login: acepta solo credenciales válidas
- [ ] Acceso sin token: denegado (`401`)
- [ ] Acceso con token válido: OK (`200`)
- [ ] Guard de rutas admin en frontend funciona

---

## 📂 Archivos claves creados

### Backend

- `models/User.js`
- `controllers/authController.js`
- `routes/authRoutes.js`
- `middleware/authMiddleware.js`

### Frontend

- `pages/Login.jsx`
- `pages/Register.jsx`
- `context/AuthContext.js`
- `components/PrivateRoute.jsx`

---

## 📎 Documentación útil

- [Endpoints de autenticación](../api/Endpoints_Api_Restaurante.pdf)
- [Esquema de entidad Usuario/Empresa](../db/Base_Datos_Restaurante.pdf)
- [Flujo de login y acceso](../flujos/Flujos_Usuario_Restaurante.pdf)
- [Roadmap - Paso 1](./Roadmap_De_Implementación.pdf)

---

## 🧭 Siguiente paso

[⬅️ Volver al README principal](../README.md)  
[➡️ Ir al Paso 2 — Gestión de Sucursales](PASO_2_SUCURSALES.md)

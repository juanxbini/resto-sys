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

## 🧭 ¿Cómo funciona el flujo interno?

### Petición protegida: `GET /api/me`

1. El navegador o cliente hace una solicitud:

   ```
   GET /api/me
   Authorization: Bearer <token>
   ```

2. Express redirige esta ruta gracias a:

   ```js
   app.use(mainRoutes); // En server.js
   ```

3. En `routes/index.js` se monta:

   ```js
   router.use('/api', authRoutes);
   ```

4. En `routes/authRoutes.js` coincide con:

   ```js
   router.get('/me', authMiddleware, getMe);
   ```

   * Primero se ejecuta `authMiddleware`
   * Si todo va bien, se ejecuta `getMe`

5. El middleware `auth.js`:

   * Extrae el token del header
   * Verifica el token con `jwt.verify()`
   * Busca el usuario en MongoDB
   * Lo guarda en `req.user`
   * Llama a `next()`

6. El controlador `getMe`:

   * Recibe `req` y `res`
   * Devuelve `req.user` en la respuesta:

     ```js
     res.status(200).json(req.user);
     ```

✅ Resultado: el cliente recibe los datos del usuario logueado.

Este patrón (middleware → controlador) se repetirá en todas las rutas protegidas del sistema.

---

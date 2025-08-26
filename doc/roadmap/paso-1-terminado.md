# Paso 1 - Autenticación (Backend)

## 📚 Índice

- Paso 1 - Autenticación (Backend)
  - [🌟 Objetivo](#-objetivo)
  - [🔹 Tecnologías utilizadas](#-tecnologías-utilizadas)
  - [📂 Estructura creada](#-estructura-creada)
  - [📅 Descripción de los archivos](#-descripción-de-los-archivos)
    - [`models/User.js`](#modelsuserjs)
    - [`controllers/authController.js`](#controllersauthcontrollerjs)
      - [`registerUser`](#registeruser)
      - [`loginUser`](#loginuser)
      - [`getMe`](#getme)
    - [`middleware/auth.js`](#middlewareauthjs)
    - [`routes/authRoutes.js`](#routesauthroutesjs)
  - [🚪 Endpoint protegido](#-endpoint-protegido)
  - [💡 Estado final del Paso 1](#-estado-final-del-paso-1)
  - [🧭 ¿Cómo funciona el flujo interno?](#-cómo-funciona-el-flujo-interno)
    - [Petición protegida: `GET /api/me`](#petición-protegida-get-apime)

---

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

Flujo del registro de usuario:

1. El cliente envía `POST /api/register` con email, password y nombre de empresa.
2. La ruta `authRoutes.js` redirige la petición a `registerUser`.
3. `registerUser`:

   * Verifica si el email ya existe en la DB.
   * Si existe → responde `400 Bad Request`.
   * Si no existe → hashea la contraseña con bcrypt.
   * Crea y guarda el usuario en MongoDB.
   * Genera un **JWT** con el `_id` del usuario.
   * Responde `201 Created` con `{ token }`.

Código simplificado:

```js
const registerUser = async (req, res) => {
  const { email, password, nombre_empresa, logo } = req.body;
  const existeUsuario = await User.findOne({ email });
  if (existeUsuario) return res.status(400).json({ msg: 'El email ya está registrado' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = new User({ email, password: hashedPassword, nombre_empresa, logo });
  await nuevoUsuario.save();

  const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token });
};
```

---

#### `loginUser`

Flujo del login de usuario:

1. El cliente envía `POST /api/login` con email y password.
2. La ruta `authRoutes.js` redirige la petición a `loginUser`.
3. `loginUser`:

   * Busca el usuario en MongoDB por email.
   * Si no existe → responde `401 Unauthorized`.
   * Si existe → compara la contraseña con bcrypt.
   * Si no coincide → responde `401 Unauthorized`.
   * Si coincide → genera un **JWT** con el `_id` del usuario.
   * Responde `200 OK` con `{ token }`.

Código simplificado:

```js
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await User.findOne({ email });
  if (!usuario) return res.status(401).json({ msg: 'Credenciales inválidas' });

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) return res.status(401).json({ msg: 'Credenciales inválidas' });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ token });
};
```

---

#### `getMe`

* Protegido por el middleware JWT.
* Devuelve los datos del usuario logueado en base al token válido.

```js
const getMe = (req, res) => {
  res.status(200).json(req.user);
};
```

---

### `middleware/auth.js`

* Intercepta rutas protegidas.
* Extrae el token de los headers.
* Verifica el token con `jwt.verify()`.
* Busca al usuario en DB.
* Inyecta el usuario en `req.user`.
* Si el token es inválido → responde `401 Unauthorized`.

```js
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ msg: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};
```

---

### `routes/authRoutes.js`

Define las rutas de autenticación:

```js
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
```

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

1. El cliente hace la solicitud con `Authorization: Bearer <token>`.
2. Express reenvía la petición a `authRoutes.js`.
3. La ruta coincide con `router.get('/me', authMiddleware, getMe);`.
4. `authMiddleware` verifica el token y busca el usuario.
5. Si es válido → `req.user` queda disponible.
6. `getMe` devuelve `req.user` en la respuesta.

✅ Resultado: el cliente recibe los datos del usuario logueado.

---

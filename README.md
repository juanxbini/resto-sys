# 🍽️ Resto-Sys

Sistema Web de Gestión para Restaurantes con Sucursales  
Stack: **React + Vite + Tailwind v4 + Node.js + Express + MongoDB**

---

## ✅ Paso 0 — Preparación y Cimientos

**Objetivo:** Tener el entorno funcional en local, con frontend y backend conectados, y un endpoint `/api/health` que verifique conexión.

---

### 🧱 Estructura del proyecto

```bash
resto-sys/
├── frontend/
└── backend/
```

---

### 🚀 Backend

- Stack: `Node.js + Express + MongoDB + JWT`
- Estructura mínima inicial:

```bash
/backend
├── server.js
└── routes/
    └── index.js
```

- Dependencias instaladas:

```bash
npm install express cors dotenv
```

- Endpoint `/api/health`:

```js
// server.js
const express = require('express')
const app = express()
app.get('/api/health', (req, res) => res.json({ status: 'OK API' }))
app.listen(3000, () => console.log('Backend on http://localhost:3000'))
```

- Script de ejecución:

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

- Verificación:
  - URL: `http://localhost:3000/api/health`
  - Respuesta esperada: `{ "status": "OK API" }`

---

### 💻 Frontend

- Stack: `Vite + React + TailwindCSS v4 + Axios + React Router + React Query`
- Dependencias instaladas:

```bash
npm install react-router-dom axios @tanstack/react-query
npm install tailwindcss @tailwindcss/vite
```

- `.env`:

```
VITE_API_URL=http://localhost:3000
```

- Conexión con backend (App.jsx):

```jsx
useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_URL}/api/health`)
    .then(response => {
      if (response.status === 200 && response.data.status === 'OK API') {
        setBackendStatus('ok')
      } else {
        setBackendStatus('error')
      }
    })
    .catch(() => setBackendStatus('error'))
}, [])
```

- Resultado visual:
  - ✅ Muestra “Backend OK” si responde correctamente
  - ❌ Muestra “Backend OFF” si no hay conexión

---

### 📈 Estado del Paso 0

| Item                                       | Estado |
|--------------------------------------------|--------|
| Estructura base del monorepo               | ✅ OK  |
| Servidor backend funcional (localhost:3000)| ✅ OK  |
| Frontend configurado (localhost:5173)      | ✅ OK  |
| Endpoint `/api/health` verificado          | ✅ OK  |
| Comunicación FE ↔ BE con axios             | ✅ OK  |

---

> Próximo paso → [Paso 1: Autenticación](#) — Registro, login, JWT, rutas protegidas


import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [backendStatus, setBackendStatus] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/health`)
      .then((response) => {
        if (response.status === 200 && response.data.status === 'OK API') {
          setBackendStatus('ok')
        } else {
          setBackendStatus('error')
        }
      })
      .catch((error) => {
        console.error("❌ Error al conectar:", error)
        setBackendStatus('error')
      })
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      <h1 className="text-3xl font-bold">
        {backendStatus === 'ok'
          ? '✅ Backend OK'
          : backendStatus === 'error'
          ? '❌ Backend OFF'
          : '⏳ Verificando...'}
      </h1>
    </div>
  )
}

export default App

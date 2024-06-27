import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from '@/context/global.context.jsx'
import { AuthProvider } from '@/context/auth.context'
import App from '@/App'
import '@/index.css'
import ErrorBoundary from '@/components/ErrorBoundary'

// Renderiza la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary>
      <AuthProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
)

// Registra el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration.scope)
      })
      .catch((err) => {
        console.log('Registro de Service Worker fallido:', err)
      })
  })
}

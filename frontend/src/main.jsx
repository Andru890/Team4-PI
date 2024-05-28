import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from '@/context/global.context.jsx'
import { AuthProvider } from '@/context/AuthContext'
import App from '@/App'
import '@/index.css'
import ErrorBoundary from '@/components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <AuthProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AuthProvider>
    </ContextProvider>
  </BrowserRouter>
)

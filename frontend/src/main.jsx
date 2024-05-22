import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from '@/context/global.context.jsx'
import App from '@/App'
import '@/index.css'
import ErrorBoundary from '@/components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ContextProvider>
  </BrowserRouter>
)

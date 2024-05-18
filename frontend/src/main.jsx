import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from '@/Context/global.context.jsx'
import App from '@/App'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
)

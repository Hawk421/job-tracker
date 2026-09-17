import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { JobProvider } from './context/JobContext'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <JobProvider>
          <App />
        </JobProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
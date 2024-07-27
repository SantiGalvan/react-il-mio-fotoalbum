import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './scss/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { GlobalProvider } from './contexts/GlobalContext.jsx'
import { DarkModeProvider } from './contexts/DarkModeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <GlobalProvider>
          <AuthProvider>

            <App />

          </AuthProvider>
        </GlobalProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

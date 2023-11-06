import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext.jsx'
import { FiltroProvider } from './context/FiltroContext.jsx'

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <FiltroProvider>
        <App />

        <ToastContainer />
      </FiltroProvider>
    </AuthProvider>
  </BrowserRouter>
)

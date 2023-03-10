import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './fonts/GothamMedium.ttf'
import './fonts/Heavitas.ttf'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ToastContainer theme="dark" position="bottom-right" hideProgressBar closeButton={false} />
  </React.StrictMode>
)

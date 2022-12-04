import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './fonts/GothamMedium.ttf'
import './fonts/Heavitas.ttf'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

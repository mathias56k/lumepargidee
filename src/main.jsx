import React from 'react'
import ReactDOM from 'react-dom/client'
import AppTest from './AppTest.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppTest />
    <App />
  </React.StrictMode>,
)

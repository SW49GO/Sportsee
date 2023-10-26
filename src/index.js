import { MonProvider } from './context/Context'
import Router from './components/Router'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MonProvider>
      <Router/>
    </MonProvider>
  </React.StrictMode>
)


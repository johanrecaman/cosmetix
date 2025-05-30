import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CosmetixLanding from './Home.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CosmetixLanding />
  </StrictMode>,
)

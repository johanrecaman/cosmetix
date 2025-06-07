"use client"

import { useState } from "react"
import CosmetixLanding from "./Home"
import Login from "./Login"
// Corrigir o import do Register
import Register from "./Register"

// Atualizar o tipo Page para incluir register
type Page = "home" | "login" | "register"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")

  const navigateToLogin = () => setCurrentPage("login")
  const navigateToHome = () => setCurrentPage("home")
  // Adicionar função de navegação para register
  const navigateToRegister = () => setCurrentPage("register")

  // Adicionar condição para renderizar a página de register
  if (currentPage === "register") {
    return <Register onBackToHome={navigateToHome} onNavigateToLogin={navigateToLogin} />
  }

  if (currentPage === "login") {
    return <Login onBackToHome={navigateToHome} onNavigateToRegister={navigateToRegister} />
  }

  // Atualizar a chamada do CosmetixLanding para incluir onNavigateToRegister
  return <CosmetixLanding onNavigateToLogin={navigateToLogin} onNavigateToRegister={navigateToRegister} />
}

export default App

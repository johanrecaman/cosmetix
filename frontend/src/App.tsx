"use client"

import { useState, useEffect } from "react"
import CosmetixLanding from "./Home"
import Login from "./Login"
import Register from "./Register"
import UserProfile from "./UserProfile"

type Page = "home" | "login" | "register" | "profile"

interface User {
  id: number
  name: string
  email: string
  loginTime?: string
  expiresAt?: string
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on app load
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem("cosmetix_user")
        if (savedUser) {
          const userData = JSON.parse(savedUser)

          // Check if session is still valid
          if (userData.expiresAt && new Date(userData.expiresAt) > new Date()) {
            setUser(userData)
          } else {
            // Session expired, clear it
            localStorage.removeItem("cosmetix_user")
          }
        }
      } catch (error) {
        console.error("Error checking session:", error)
        localStorage.removeItem("cosmetix_user")
      } finally {
        setIsLoading(false)
      }
    }

    checkExistingSession()
  }, [])

  const navigateToLogin = () => setCurrentPage("login")
  const navigateToHome = () => setCurrentPage("home")
  const navigateToRegister = () => setCurrentPage("register")
  const navigateToProfile = () => setCurrentPage("profile")

  const handleLoginSuccess = (userData: User) => {
    setUser(userData)
    // Save to localStorage for persistence
    localStorage.setItem("cosmetix_user", JSON.stringify(userData))
    setCurrentPage("home")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("cosmetix_user")
    setCurrentPage("home")
  }

  // Show loading while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (currentPage === "register") {
    return <Register onBackToHome={navigateToHome} onNavigateToLogin={navigateToLogin} />
  }

  if (currentPage === "login") {
    return (
      <Login
        onBackToHome={navigateToHome}
        onNavigateToRegister={navigateToRegister}
        onLoginSuccess={handleLoginSuccess}
      />
    )
  }

  if (currentPage === "profile" && user) {
    return <UserProfile user={user} onBackToHome={navigateToHome} onLogout={handleLogout} />
  }

  return (
    <CosmetixLanding
      onNavigateToLogin={navigateToLogin}
      onNavigateToRegister={navigateToRegister}
      onNavigateToProfile={navigateToProfile}
      user={user}
    />
  )
}

export default App


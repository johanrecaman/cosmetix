"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"



function CosmetixLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer petals */}
          <path
            d="M20 8C24 8 28 12 28 16C28 20 24 24 20 24C16 24 12 20 12 16C12 12 16 8 20 8Z"
            fill="url(#gradient1)"
            className="opacity-80"
          />
          <path
            d="M32 20C32 24 28 28 24 28C20 28 16 24 16 20C16 16 20 12 24 12C28 12 32 16 32 20Z"
            fill="url(#gradient2)"
            className="opacity-70"
          />
          <path
            d="M24 32C24 28 20 24 16 24C12 24 8 28 8 32C8 36 12 40 16 40C20 40 24 36 24 32Z"
            fill="url(#gradient3)"
            className="opacity-80"
          />
          <path
            d="M8 20C8 16 12 12 16 12C20 12 24 16 24 20C24 24 20 28 16 28C12 28 8 24 8 20Z"
            fill="url(#gradient4)"
            className="opacity-70"
          />

          {/* Center circle */}
          <circle cx="20" cy="20" r="6" fill="url(#centerGradient)" />

          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
            <radialGradient id="centerGradient">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        Cosmetix
      </span>
    </div>
  )
}

// Adicionar navegação para cadastro na interface
interface LoginProps {
  onBackToHome: () => void
  onNavigateToRegister: () => void
}

// Atualizar a função do componente para aceitar o novo prop
export default function Login({ onBackToHome, onNavigateToRegister }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular login
    setTimeout(() => {
      setIsLoading(false)
      alert("Login realizado com sucesso!")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <header className="px-4 py-6 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <CosmetixLogo />
          <button
            onClick={onBackToHome}
            className="inline-flex items-center justify-center rounded-md border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-400 shadow-sm transition-colors hover:bg-pink-50 hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-gray-800">Bem-vindo de </span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">volta</span>
              <span className="text-gray-800">.</span>
            </h1>
            <p className="text-gray-600">Acesse sua conta para ver suas recomendações personalizadas</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-pink-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full px-3 py-2 border border-pink-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <button type="button" className="text-sm text-pink-500 hover:text-pink-600 transition-colors">
                    Esqueceu a senha?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-pink-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-pink-100"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou continue com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-4 py-2 border border-pink-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-pink-50 transition-colors"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-4 py-2 border border-pink-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-pink-50 transition-colors"
                >
                  Facebook
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
            >
              Cadastre-se agora
            </button>
          </p>
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-sm text-gray-500">
        <p>© 2025 Cosmetix. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

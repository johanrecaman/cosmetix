"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

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

interface RegisterProps {
  onBackToHome: () => void
  onNavigateToLogin: () => void
}

export default function Register({ onBackToHome, onNavigateToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Nome é obrigatório"
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = "Email inválido"
    }

    if (!formData.user_password) {
      newErrors.user_password = "Senha é obrigatória"
    } else if (formData.user_password.length < 6) {
      newErrors.user_password = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.user_password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: formData.user_name,
          user_email: formData.user_email,
          user_password: formData.user_password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro ao criar conta')
      }

      const userData = await response.json()
      alert("Cadastro realizado com sucesso! Bem-vindo à Cosmetix!")
      
      // Limpar formulário após sucesso
      setFormData({
        user_name: "",
        user_email: "",
        user_password: "",
        confirmPassword: "",
      })
      
    } catch (error) {
      console.error('Erro no cadastro:', error)
      
      if (error instanceof Error) {
        // Verificar se é erro de email já existente
        if (error.message.includes('email') || error.message.includes('já existe')) {
          setErrors({ user_email: 'Este email já está cadastrado' })
        } else {
          alert(`Erro ao criar conta: ${error.message}`)
        }
      } else {
        alert('Erro ao criar conta. Verifique sua conexão e tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
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
              <span className="text-gray-800">Crie sua </span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">conta</span>
              <span className="text-gray-800">.</span>
            </h1>
            <p className="text-gray-600">Descubra produtos de beleza personalizados para você</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-pink-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.user_name
                      ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                      : "border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  }`}
                />
                {errors.user_name && <p className="text-sm text-red-600">{errors.user_name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.user_email
                      ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                      : "border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  }`}
                />
                {errors.user_email && <p className="text-sm text-red-600">{errors.user_email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="user_password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="user_password"
                    name="user_password"
                    type={showPassword ? "text" : "password"}
                    value={formData.user_password}
                    onChange={handleInputChange}
                    placeholder="Mínimo 6 caracteres"
                    className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.user_password
                        ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                        : "border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.user_password && <p className="text-sm text-red-600">{errors.user_password}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Digite a senha novamente"
                    className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                        : "border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-pink-400 border-pink-200 rounded focus:ring-pink-400"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Eu aceito os{" "}
                  <button type="button" className="text-pink-500 hover:text-pink-600 underline">
                    termos de uso
                  </button>{" "}
                  e{" "}
                  <button type="button" className="text-pink-500 hover:text-pink-600 underline">
                    política de privacidade
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-pink-100"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou cadastre-se com</span>
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
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
            >
              Faça login
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

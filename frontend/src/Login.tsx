"use client"

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

interface LoginProps {
  onBackToHome: () => void
  onNavigateToRegister: () => void
  onLoginSuccess?: (userData: any) => void
}

// Configuração da API
const API_BASE_URL = "http://localhost:8000"

export default function Login({ onBackToHome, onNavigateToRegister, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const authenticateUser = async (email: string, password: string) => {
    try {
      // Primeiro, buscar todos os usuários e filtrar localmente
      // (já que não há endpoint específico de login)
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const users = await response.json()

      // Encontrar usuário pelo email
      const user = users.find((u: any) => u.user_email.toLowerCase() === email.toLowerCase())

      if (!user) {
        throw new Error("User not found")
      }

      // Validar senha (em produção, isso deveria ser feito no backend com hash)
      if (user.user_password !== password) {
        throw new Error("Invalid password")
      }

      // Retornar dados do usuário (sem a senha)
      const { user_password, ...userWithoutPassword } = user
      return {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
        ...userWithoutPassword,
      }
    } catch (error) {
      console.error("Erro na autenticação:", error)
      throw error
    }
  }

  const handleSubmit = async () => {
    setError("")

    // Validações básicas
    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um email válido")
      return
    }

    if (password.length < 3) {
      setError("A senha deve ter pelo menos 3 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const userData = await authenticateUser(email, password)

      // Sucesso no login
      const userSession = {
        ...userData,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)).toISOString(),
      }

      console.log("Login realizado com sucesso:", userSession)

      // Callback para o componente pai com os dados do usuário
      if (onLoginSuccess) {
        onLoginSuccess(userSession)
      } else {
        // Fallback: redirecionar para página inicial
        onBackToHome()
      }
    } catch (error) {
      console.error("Erro no login:", error)

      // Tratar diferentes tipos de erro
      if (error instanceof Error) {
        if (error.message.includes("User not found")) {
          setError("Usuário não encontrado")
        } else if (error.message.includes("Invalid password")) {
          setError("Senha incorreta")
        } else if (error.message.includes("500")) {
          setError("Erro interno do servidor. Tente novamente mais tarde.")
        } else if (error.message.includes("NetworkError") || error.message.includes("fetch")) {
          setError("Erro de conexão.")
        } else {
          setError("Erro inesperado. Tente novamente.")
        }
      } else {
        setError("Erro de conexão com o servidor")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    setError("")

    // Login social não está implementado no backend atual
    // Desabilitar por enquanto
    setError(`Login via ${provider} não está disponível no momento`)
    setIsLoading(false)
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Digite seu email primeiro para recuperar a senha")
      return
    }

    if (!validateEmail(email)) {
      setError("Digite um email válido para recuperar a senha")
      return
    }

    // Recuperação de senha não está implementada no backend atual
    alert(`Funcionalidade de recuperação de senha será implementada em breve para: ${email}`)
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
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
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
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border border-pink-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-pink-400 focus:ring-pink-400 border-pink-200 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar de mim por 7 dias
                </label>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Entrando...
                  </div>
                ) : (
                  "Entrar"
                )}
              </button>
            </div>

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
                  onClick={() => handleSocialLogin("Google")}
                  disabled={true}
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed"
                >
                  Google (Em breve)
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={true}
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed"
                >
                  Facebook (Em breve)
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


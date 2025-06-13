"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, LogOut, User, CheckCircle, Clock, Edit, Save, X } from "lucide-react"
import BeautyQuiz from "./BeautyQuiz"
import ProductRecommendations from "./ProductRecommendations"

function CosmetixLogo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <div className={`flex items-center space-x-2 cursor-pointer ${className}`} onClick={onClick}>
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

interface UserType {
  id: number
  name: string
  email: string
}

interface UserProfileProps {
  user: UserType
  onBackToHome: () => void
  onLogout: () => void
}

export default function UserProfile({ user, onBackToHome, onLogout }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "quiz" | "recommendations">("profile")
  const [userTraits, setUserTraits] = useState(null)
  const [isLoadingTraits, setIsLoadingTraits] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editFormData, setEditFormData] = useState({
    user_name: user.name,
    user_email: user.email,
  })
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  useEffect(() => {
    fetchUserTraits()
  }, [user.id])

  const fetchUserTraits = async () => {
    try {
      const response = await fetch(`http://localhost:8000/traits`)
      const allTraits = await response.json()
      const userTraitsData = allTraits.find((trait: any) => trait.traits_user_id === user.id)
      setUserTraits(userTraitsData || null)
    } catch (error) {
      console.error("Error fetching traits:", error)
    } finally {
      setIsLoadingTraits(false)
    }
  }

  const handleQuizComplete = (results: any) => {
    console.log("Quiz completed with results:", results)
    fetchUserTraits() // Refresh traits data
    setActiveTab("recommendations")
  }

  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true)
    try {
      const response = await fetch(`http://localhost:8000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      // Update local storage
      const updatedUser = {
        ...user,
        name: editFormData.user_name,
        email: editFormData.user_email,
      }
      localStorage.setItem("cosmetix_user", JSON.stringify(updatedUser))

      setIsEditingProfile(false)
      alert("Perfil atualizado com sucesso!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Erro ao atualizar perfil. Tente novamente.")
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const handleDeleteTraits = async () => {
    if (!userTraits) return

    if (confirm("Tem certeza que deseja refazer o quiz? Seus dados atuais serão substituídos.")) {
      try {
        await fetch(`http://localhost:8000/traits/${userTraits.traits_id}`, {
          method: "DELETE",
        })
        setUserTraits(null)
        setActiveTab("quiz")
      } catch (error) {
        console.error("Error deleting traits:", error)
        alert("Erro ao resetar quiz. Tente novamente.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-4 py-6 md:px-6 bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto flex items-center justify-between">
          <CosmetixLogo onClick={onBackToHome} />
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center justify-center rounded-md border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-400 shadow-sm transition-colors hover:bg-pink-50 hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Início
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mb-6">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Olá,{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {editFormData.user_name.split(" ")[0]}
            </span>
            !
          </h1>
          <p className="text-lg text-gray-600">Bem-vinda ao seu perfil personalizado da Cosmetix</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg border border-pink-100">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Meu Perfil
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === "quiz"
                    ? "bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Quiz de Beleza
              </button>
              <button
                onClick={() => setActiveTab("recommendations")}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === "recommendations"
                    ? "bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Recomendações
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "profile" && (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-pink-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Informações do Perfil</h2>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-md hover:bg-pink-100 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={editFormData.user_name}
                        onChange={(e) => setEditFormData((prev) => ({ ...prev, user_name: e.target.value }))}
                        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                      />
                    ) : (
                      <div className="px-3 py-2 border border-pink-200 rounded-md bg-pink-50/50">
                        {editFormData.user_name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditingProfile ? (
                      <input
                        type="email"
                        value={editFormData.user_email}
                        onChange={(e) => setEditFormData((prev) => ({ ...prev, user_email: e.target.value }))}
                        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                      />
                    ) : (
                      <div className="px-3 py-2 border border-pink-200 rounded-md bg-pink-50/50">
                        {editFormData.user_email}
                      </div>
                    )}
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdatingProfile}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-400 to-purple-400 rounded-md hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 transition-all"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isUpdatingProfile ? "Salvando..." : "Salvar"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingProfile(false)
                        setEditFormData({ user_name: user.name, user_email: user.email })
                      }}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </button>
                  </div>
                )}

                <div className="border-t border-pink-100 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Status do Quiz</h3>
                  {isLoadingTraits ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-400"></div>
                      <span className="text-gray-600">Carregando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      {userTraits ? (
                        <>
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <span className="text-green-700 font-medium">Quiz concluído!</span>
                          <button
                            onClick={handleDeleteTraits}
                            className="text-sm text-pink-500 hover:text-pink-600 underline"
                          >
                            Refazer quiz
                          </button>
                        </>
                      ) : (
                        <>
                          <Clock className="h-6 w-6 text-orange-500" />
                          <span className="text-orange-700 font-medium">Quiz pendente</span>
                          <button
                            onClick={() => setActiveTab("quiz")}
                            className="text-sm text-pink-500 hover:text-pink-600 underline"
                          >
                            Fazer agora
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "quiz" && <BeautyQuiz userId={user.id} onComplete={handleQuizComplete} />}

          {activeTab === "recommendations" && <ProductRecommendations userTraits={userTraits} />}
        </div>
      </main>
    </div>
  )
}


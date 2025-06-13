"use client"

import { useState, useEffect } from "react"
import { Sparkles, Heart, Star, ShoppingBag } from "lucide-react"

interface Product {
  product_id: number
  product_name: string
  product_ingredients: string
}

interface ProductRecommendationsProps {
  userTraits: any
}

export default function ProductRecommendations({ userTraits }: ProductRecommendationsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (products.length > 0 && userTraits) {
      generateRecommendations()
    }
  }, [products, userTraits])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/products")
      const productsData = await response.json()
      setProducts(productsData)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateRecommendations = () => {
    // Simple recommendation algorithm based on user traits
    let filtered = [...products]

    if (userTraits.traits_skin_type === "oily") {
      filtered = filtered.filter(
        (product) =>
          product.product_name.toLowerCase().includes("oil-free") ||
          product.product_name.toLowerCase().includes("matte") ||
          product.product_ingredients.toLowerCase().includes("salicylic acid"),
      )
    }

    if (userTraits.traits_skin_type === "dry") {
      filtered = filtered.filter(
        (product) =>
          product.product_name.toLowerCase().includes("hydrating") ||
          product.product_name.toLowerCase().includes("moisturizing") ||
          product.product_ingredients.toLowerCase().includes("hyaluronic acid"),
      )
    }

    if (userTraits.traits_acneic !== "no_acne") {
      filtered = filtered.filter(
        (product) =>
          product.product_name.toLowerCase().includes("acne") ||
          product.product_ingredients.toLowerCase().includes("benzoyl peroxide") ||
          product.product_ingredients.toLowerCase().includes("salicylic acid"),
      )
    }

    // If no specific matches, show random products
    if (filtered.length === 0) {
      filtered = products.slice(0, 6)
    }

    setRecommendations(filtered.slice(0, 6))
  }

  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-pink-100 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando recomendações...</p>
        </div>
      </div>
    )
  }

  if (!userTraits) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-pink-100 p-8">
        <div className="text-center">
          <Sparkles className="h-16 w-16 text-pink-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Suas Recomendações</h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              Complete o quiz de beleza para receber suas recomendações personalizadas!
            </p>
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6">
              <p className="text-gray-700">
                Nosso algoritmo inteligente analisará suas características únicas e sugerirá os produtos perfeitos para
                você.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-pink-100 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Suas Recomendações{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Personalizadas
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Com base no seu perfil de beleza, selecionamos os produtos ideais para você
          </p>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Seu Perfil de Beleza</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Tipo de Pele:</span>
            <p className="text-gray-600 capitalize">{userTraits.traits_skin_type}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Tom de Pele:</span>
            <p className="text-gray-600 capitalize">{userTraits.traits_skin_color?.replace("_", " ")}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Sensibilidade:</span>
            <p className="text-gray-600">{userTraits.traits_sensible}/10</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Tipo de Cabelo:</span>
            <p className="text-gray-600 uppercase">{userTraits.traits_hair_type}</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-pink-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Produtos Recomendados</h3>

        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum produto específico encontrado para seu perfil.</p>
            <p className="text-sm text-gray-500 mt-2">
              Estamos trabalhando para adicionar mais produtos ao nosso catálogo!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((product) => (
              <div
                key={product.product_id}
                className="bg-white border border-pink-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="aspect-square relative mb-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-md overflow-hidden">
                    <div className="absolute top-2 right-2 bg-pink-200 text-pink-700 text-xs font-medium px-2 py-1 rounded-full">
                      Recomendado
                    </div>
                    <div className="h-full w-full flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt={product.product_name}
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.product_name}</h4>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Ingredientes principais:</p>
                    <p className="text-xs text-gray-500 line-clamp-3">{product.product_ingredients}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-gray-300" />
                      <span className="text-xs text-gray-500 ml-1">4.0</span>
                    </div>
                    <button className="p-2 text-pink-500 hover:text-pink-600 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>

                  <button className="w-full mt-4 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-medium py-2 px-4 rounded-md transition-all">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Dicas Personalizadas</h3>
        <div className="space-y-2 text-sm text-gray-700">
          {userTraits.traits_skin_type === "oily" && (
            <p>• Para pele oleosa, use produtos oil-free e evite over-cleansing</p>
          )}
          {userTraits.traits_skin_type === "dry" && (
            <p>• Para pele seca, priorize hidratantes com ácido hialurônico e ceramidas</p>
          )}
          {userTraits.traits_sensible > 7 && <p>• Sua pele é sensível, evite produtos com fragrâncias e álcool</p>}
          {userTraits.traits_acneic !== "no_acne" && (
            <p>• Para controlar a acne, use produtos com ácido salicílico ou peróxido de benzoíla</p>
          )}
          <p>• Sempre use protetor solar, independente do tipo de pele</p>
          <p>• Faça patch test antes de usar produtos novos</p>
        </div>
      </div>
    </div>
  )
}

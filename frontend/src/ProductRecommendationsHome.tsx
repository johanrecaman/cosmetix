"use client"

import { useState, useEffect } from "react"
import { Sparkles, Star, Heart } from "lucide-react"

interface UserType {
  id: number
  name: string
  email: string
}

interface Product {
  product_id: number
  product_name: string
  product_ingredients: string
}

interface ProductRecommendationsHomeProps {
  user: UserType
}

export default function ProductRecommendationsHome({ user }: ProductRecommendationsHomeProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [userTraits, setUserTraits] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [user.id])

  const fetchUserData = async () => {
    try {
      // Fetch user traits
      const traitsResponse = await fetch("http://localhost:8000/traits")
      const allTraits = await traitsResponse.json()
      const userTraitsData = allTraits.find((trait: any) => trait.traits_user_id === user.id)
      setUserTraits(userTraitsData)

      // Fetch products
      const productsResponse = await fetch("http://localhost:8000/products")
      const productsData = await productsResponse.json()
      setProducts(productsData.slice(0, 3)) // Show only 3 products on home
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="px-4 py-16 md:px-6 bg-gradient-to-r from-purple-100/50 to-pink-100/50">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando suas recomendações...</p>
        </div>
      </section>
    )
  }

  if (!userTraits) {
    return null // Don't show anything if user hasn't completed quiz
  }

  return (
    <section className="px-4 py-16 md:px-6 bg-gradient-to-r from-purple-100/50 to-pink-100/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
            Recomendações para{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {user.name.split(" ")[0]}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Produtos escolhidos especialmente para seu perfil de beleza
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.product_id}
                className="bg-white border border-pink-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="aspect-square relative mb-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-md overflow-hidden">
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-300 to-purple-300 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Para você
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.product_name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.product_ingredients.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center mb-4">
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
                  <button className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-medium py-2 px-4 rounded-md transition-all">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Fallback products if no products in database
            <>
              <div className="bg-white border border-pink-100 rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="aspect-square relative mb-4 bg-pink-50 rounded-md overflow-hidden">
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-300 to-purple-300 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Para você
                    </div>
                    <div className="h-full w-full flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Hidratante personalizado"
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hidratante Personalizado</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Baseado no seu tipo de pele {userTraits.traits_skin_type}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-pink-400">Recomendado</span>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">95% match</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-purple-100 rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="aspect-square relative mb-4 bg-purple-50 rounded-md overflow-hidden">
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-300 to-purple-300 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Para você
                    </div>
                    <div className="h-full w-full flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Shampoo personalizado"
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Shampoo Personalizado</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Ideal para cabelo {userTraits.traits_hair_type} {userTraits.traits_hair_quality}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-purple-400">Recomendado</span>
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">92% match</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-pink-100 rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="aspect-square relative mb-4 bg-pink-50 rounded-md overflow-hidden">
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-300 to-purple-300 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Para você
                    </div>
                    <div className="h-full w-full flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Protetor solar personalizado"
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Protetor Solar Personalizado</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Adequado para pele {userTraits.traits_skin_color} e sensibilidade {userTraits.traits_sensible}/10
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-pink-400">Recomendado</span>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">98% match</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Quer ver mais recomendações personalizadas?</p>
          <button
            onClick={() => (window.location.href = "#profile")}
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-300 to-purple-300 px-6 py-3 text-white font-semibold shadow-lg transition-all hover:from-pink-400 hover:to-purple-400"
          >
            Ver Todas as Recomendações
          </button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { ArrowRight, CheckCircle, Clock, DollarSign, Sparkles, Heart, Shield } from "lucide-react"

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

// Atualizar a interface para incluir navegação para cadastro
interface CosmetixLandingProps {
  onNavigateToLogin: () => void
  onNavigateToRegister: () => void
}

// Atualizar a função do componente
export default function CosmetixLanding({ onNavigateToLogin, onNavigateToRegister }: CosmetixLandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-4 py-6 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <CosmetixLogo />
          {/* No header, substituir o botão "Entrar" por: */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateToLogin}
              className="inline-flex items-center justify-center rounded-md border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-400 shadow-sm transition-colors hover:bg-pink-50 hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              Entrar
            </button>
            <button
              onClick={onNavigateToRegister}
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-300 to-purple-300 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-pink-400 hover:to-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Pare de{" "}
              <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                adivinhar
              </span>
              . <br className="hidden md:block" />
              Encontre os produtos{" "}
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">certos</span>{" "}
              pra você.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
              Descubra os produtos de beleza que realmente funcionam para sua pele e cabelo. Sem tentativa e erro, sem
              gastar dinheiro à toa.
            </p>
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-300 to-purple-300 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-pink-400 hover:to-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
                Fazer meu teste
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <p className="text-sm text-gray-500">✨ Gratuito e leva só 3 minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="px-4 py-16 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">Como funciona</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Três passos simples para descobrir sua rotina de beleza ideal
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-pink-200">
                <span className="text-2xl font-bold text-pink-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Você faz um teste rápido</h3>
              <p className="text-gray-600">
                Responda perguntas sobre sua pele, cabelo e rotina atual. É super rápido e fácil!
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">A gente entende sua pele e cabelo</h3>
              <p className="text-gray-600">
                Nossa tecnologia analisa suas respostas e identifica exatamente o que você precisa.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-pink-200">
                <span className="text-2xl font-bold text-pink-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Você recebe recomendações personalizadas</h3>
              <p className="text-gray-600">Sugerimos os produtos ideais para você, sem precisar comprar às cegas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher - MELHORADA */}
      <section className="px-4 py-20 md:px-6 relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-purple-50/20 to-pink-50/30"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mb-6">
              Por que escolher a{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Cosmetix
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme sua rotina de beleza com inteligência e personalização
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Economia Inteligente</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Pare de desperdiçar dinheiro com produtos que não funcionam. Nossa IA identifica exatamente o que
                    sua pele precisa.
                  </p>
                  <div className="mt-6 flex items-center justify-center space-x-2">
                    <div className="flex -space-x-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">+10k usuárias economizando</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Resultados Reais</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Recomendações baseadas em ciência e dados reais. Veja sua pele e cabelo transformarem com produtos
                    que realmente funcionam.
                  </p>
                  <div className="mt-6 inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-sm font-medium text-purple-700">97% de satisfação</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Confiança Total</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Algoritmo desenvolvido com dermatologistas e especialistas. Recomendações seguras e personalizadas
                    para seu tipo único.
                  </p>
                  <div className="mt-6 flex items-center justify-center space-x-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-pink-400 mr-1" />
                      <span className="text-sm text-gray-600">3 min</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 text-purple-400 mr-1" />
                      <span className="text-sm text-gray-600">Gratuito</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Alta */}
      <section className="px-4 py-16 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">Produtos em alta</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra os produtos mais recomendados pelo nosso algoritmo
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white border border-pink-100 rounded-lg shadow-sm">
              <div className="p-6">
                <div className="aspect-square relative mb-4 bg-pink-50 rounded-md overflow-hidden">
                  <div className="absolute top-2 right-2 bg-pink-200 text-pink-700 text-xs font-medium px-2 py-1 rounded-full">
                    Hidratante
                  </div>
                  <div className="h-full w-full flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Hidratante facial"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hidratante Facial Calmante</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Perfeito para peles sensíveis, hidrata sem deixar oleosidade
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-pink-400">Pele sensível</span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">92% de aprovação</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-purple-100 rounded-lg shadow-sm">
              <div className="p-6">
                <div className="aspect-square relative mb-4 bg-purple-50 rounded-md overflow-hidden">
                  <div className="absolute top-2 right-2 bg-purple-200 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                    Shampoo
                  </div>
                  <div className="h-full w-full flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Shampoo para cabelos cacheados"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shampoo para Cachos Definidos</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Limpa sem ressecar, mantém os cachos definidos e hidratados
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-purple-400">Cabelos cacheados</span>
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">95% de aprovação</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-pink-100 rounded-lg shadow-sm">
              <div className="p-6">
                <div className="aspect-square relative mb-4 bg-pink-50 rounded-md overflow-hidden">
                  <div className="absolute top-2 right-2 bg-pink-200 text-pink-700 text-xs font-medium px-2 py-1 rounded-full">
                    Protetor
                  </div>
                  <div className="h-full w-full flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Protetor solar facial"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Protetor Solar Facial FPS 50</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Toque seco, não deixa resíduo branco, ideal para uso diário
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-pink-400">Todos os tipos de pele</span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">98% de aprovação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-4 py-16 md:px-6 bg-gradient-to-r from-pink-200/70 to-purple-200/70">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Pronta para descobrir seus produtos ideais?
            </h2>
            <p className="text-lg text-gray-700 md:text-xl">
              Faça o teste agora e receba recomendações personalizadas para sua rotina de beleza.
            </p>
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-300 to-purple-300 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-pink-400 hover:to-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
                Fazer meu teste gratuito
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <p className="text-sm text-gray-600">✨ Sem compromisso • Resultados em 3 minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <CosmetixLogo />
            <p className="text-sm text-gray-600">© 2024 Cosmetix. Todos os direitos reservados.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                Termos
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

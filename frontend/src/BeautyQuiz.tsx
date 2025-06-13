"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles } from "lucide-react"

interface QuizData {
  traits_gender: string
  traits_skin_color: string
  traits_skin_type: string
  traits_sensible: number
  traits_age: number
  traits_acneic: string
  traits_hair_color: string
  traits_hair_type: string
  traits_hair_quality: string
}

interface BeautyQuizProps {
  userId: number
  onComplete: (results: QuizData) => void
}

export default function BeautyQuiz({ userId, onComplete }: BeautyQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizData, setQuizData] = useState<QuizData>({
    traits_gender: "",
    traits_skin_color: "",
    traits_skin_type: "",
    traits_sensible: 1,
    traits_age: 18,
    traits_acneic: "",
    traits_hair_color: "",
    traits_hair_type: "",
    traits_hair_quality: "",
  })

  const questions = [
    {
      id: "traits_gender",
      title: "Qual é o seu gênero?",
      subtitle: "Isso nos ajuda a personalizar melhor as recomendações",
      type: "radio",
      options: [
        { value: "female", label: "Feminino", emoji: "👩" },
        { value: "male", label: "Masculino", emoji: "👨" },
        { value: "other", label: "Outro/Prefiro não dizer", emoji: "🌟" },
      ],
    },
    {
      id: "traits_age",
      title: "Qual é a sua idade?",
      subtitle: "A idade influencia nas necessidades da pele",
      type: "slider",
      min: 13,
      max: 80,
      unit: "anos",
    },
    {
      id: "traits_skin_color",
      title: "Qual é o tom da sua pele?",
      subtitle: "Isso nos ajuda a recomendar produtos adequados",
      type: "radio",
      options: [
        {
          value: "very_light",
          label: "Muito clara",
          emoji: "🤍",
          description: "Queima facilmente, raramente bronzeia",
        },
        { value: "light", label: "Clara", emoji: "🌕", description: "Queima facilmente, bronzeia pouco" },
        { value: "medium", label: "Média", emoji: "🌗", description: "Às vezes queima, bronzeia gradualmente" },
        { value: "olive", label: "Oliva", emoji: "🫒", description: "Raramente queima, bronzeia bem" },
        { value: "dark", label: "Escura", emoji: "🌑", description: "Muito raramente queima, bronzeia facilmente" },
        { value: "very_dark", label: "Muito escura", emoji: "⚫", description: "Nunca queima, sempre bronzeia" },
      ],
    },
    {
      id: "traits_skin_type",
      title: "Como você descreveria seu tipo de pele?",
      subtitle: "Pense na zona T (testa, nariz e queixo)",
      type: "radio",
      options: [
        { value: "normal", label: "Normal", emoji: "😊", description: "Equilibrada, sem oleosidade excessiva" },
        { value: "oily", label: "Oleosa", emoji: "✨", description: "Brilhosa, especialmente na zona T" },
        { value: "dry", label: "Seca", emoji: "🌵", description: "Ressecada, às vezes descamativa" },
        { value: "combination", label: "Mista", emoji: "🌗", description: "Oleosa na zona T, seca nas bochechas" },
      ],
    },
    {
      id: "traits_sensible",
      title: "Em uma escala de 1 a 10, quão sensível você considera sua pele?",
      subtitle: "1 = Nada sensível, 10 = Extremamente sensível",
      type: "slider",
      min: 1,
      max: 10,
      unit: "",
    },
    {
      id: "traits_acneic",
      title: "Você tem problemas com acne?",
      subtitle: "Considere espinhas, cravos e inflamações",
      type: "radio",
      options: [
        { value: "no_acne", label: "Não tenho acne", emoji: "✨", description: "Pele limpa, sem espinhas" },
        { value: "mild_acne", label: "Acne leve", emoji: "🌱", description: "Algumas espinhas ocasionais" },
        {
          value: "moderate_acne",
          label: "Acne moderada",
          emoji: "🌿",
          description: "Espinhas regulares, alguns cravos",
        },
        {
          value: "severe_acne",
          label: "Acne severa",
          emoji: "🌺",
          description: "Muitas espinhas, inflamações frequentes",
        },
      ],
    },
    {
      id: "traits_hair_color",
      title: "Qual é a cor do seu cabelo?",
      subtitle: "Considere a cor natural ou atual",
      type: "radio",
      options: [
        { value: "black", label: "Preto", emoji: "⚫" },
        { value: "brown", label: "Castanho", emoji: "🤎" },
        { value: "blonde", label: "Loiro", emoji: "💛" },
        { value: "red", label: "Ruivo", emoji: "🧡" },
        { value: "gray", label: "Grisalho/Branco", emoji: "🤍" },
        { value: "other", label: "Outra cor", emoji: "🌈" },
      ],
    },
    {
      id: "traits_hair_type",
      title: "Qual é o tipo do seu cabelo?",
      subtitle: "Formato natural dos fios",
      type: "radio",
      options: [
        { value: "1a", label: "Liso fino (1A)", emoji: "📏", description: "Muito liso, difícil de fazer ondas" },
        { value: "1b", label: "Liso médio (1B)", emoji: "〰️", description: "Liso com leve movimento" },
        { value: "1c", label: "Liso grosso (1C)", emoji: "➰", description: "Liso com tendência a ondular" },
        { value: "2a", label: "Ondulado fino (2A)", emoji: "🌊", description: "Ondas suaves e soltas" },
        { value: "2b", label: "Ondulado médio (2B)", emoji: "〜", description: "Ondas mais definidas" },
        { value: "2c", label: "Ondulado grosso (2C)", emoji: "🌀", description: "Ondas bem marcadas" },
        { value: "3a", label: "Cacheado solto (3A)", emoji: "🌸", description: "Cachos grandes e soltos" },
        { value: "3b", label: "Cacheado médio (3B)", emoji: "🌺", description: "Cachos bem definidos" },
        { value: "3c", label: "Cacheado apertado (3C)", emoji: "🌻", description: "Cachos pequenos e definidos" },
        { value: "4a", label: "Crespo macio (4A)", emoji: "☁️", description: "Crespo com cachos pequenos" },
        { value: "4b", label: "Crespo médio (4B)", emoji: "⭐", description: "Crespo com formato em Z" },
        { value: "4c", label: "Crespo denso (4C)", emoji: "💫", description: "Crespo muito denso e volumoso" },
      ],
    },
    {
      id: "traits_hair_quality",
      title: "Como está a condição do seu cabelo?",
      subtitle: "Estado atual dos fios",
      type: "radio",
      options: [
        { value: "oily", label: "Oleoso", emoji: "💧", description: "Fica oleoso rapidamente" },
        { value: "dry", label: "Ressecado", emoji: "🏜️", description: "Seco, sem brilho, quebradiço" },
        { value: "normal", label: "Normal", emoji: "✨", description: "Equilibrado, saudável" },
        { value: "damaged", label: "Danificado", emoji: "⚡", description: "Química, calor, muito processado" },
        { value: "frizzy", label: "Com frizz", emoji: "🌪️", description: "Arrepiado, difícil de controlar" },
      ],
    },
  ]

  const currentQuestion = questions[currentStep]
  const isLastStep = currentStep === questions.length - 1
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (value: string | number) => {
    setQuizData((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const nextStep = async () => {
    if (isLastStep) {
      setIsSubmitting(true)
      try {
        console.log("Sending quiz data:", {
          traits_user_id: userId,
          ...quizData,
        })

        const response = await fetch("http://localhost:8000/traits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            traits_user_id: userId,
            ...quizData,
          }),
        })

        console.log("Response status:", response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Server error:", errorText)
          throw new Error(`Server responded with ${response.status}: ${errorText}`)
        }

        const result = await response.json()
        console.log("Quiz saved successfully:", result)
        onComplete(quizData)
      } catch (error) {
        console.error("Error saving quiz:", error)
        alert(`Erro ao salvar quiz: ${error.message}. Verifique se o servidor está rodando.`)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isCurrentStepComplete = () => {
    const currentValue = quizData[currentQuestion.id as keyof QuizData]
    return currentValue !== "" && currentValue !== 0
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-pink-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Quiz de Beleza</h2>
          <span className="text-sm font-medium text-gray-600">
            {currentStep + 1} de {questions.length}
          </span>
        </div>
        <div className="w-full bg-white/50 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-pink-400 to-purple-400 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentQuestion.title}</h3>
            <p className="text-gray-600 text-lg">{currentQuestion.subtitle}</p>
          </div>

          <div className="space-y-4">
            {currentQuestion.type === "radio" && (
              <div className="grid gap-3">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                      quizData[currentQuestion.id as keyof QuizData] === option.value
                        ? "border-pink-400 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        {option.description && <div className="text-sm text-gray-600 mt-1">{option.description}</div>}
                      </div>
                      {quizData[currentQuestion.id as keyof QuizData] === option.value && (
                        <CheckCircle className="h-6 w-6 text-pink-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "slider" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">
                      {quizData[currentQuestion.id as keyof QuizData] || currentQuestion.min}
                    </span>
                  </div>
                  <p className="text-lg font-medium text-gray-700">
                    {quizData[currentQuestion.id as keyof QuizData] || currentQuestion.min} {currentQuestion.unit}
                  </p>
                </div>
                <div className="px-4">
                  <input
                    type="range"
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    value={quizData[currentQuestion.id as keyof QuizData] || currentQuestion.min}
                    onChange={(e) => handleAnswer(Number.parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{currentQuestion.min}</span>
                    <span>{currentQuestion.max}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </button>

        <div className="flex items-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? "bg-pink-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextStep}
          disabled={!isCurrentStepComplete() || isSubmitting}
          className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-400 to-purple-400 rounded-md hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Salvando...
            </>
          ) : isLastStep ? (
            <>
              <Sparkles className="h-4 w-4 mr-1" />
              Finalizar Quiz
            </>
          ) : (
            <>
              Próxima
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </button>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f9a8d4, #c084fc);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f9a8d4, #c084fc);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}


"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Mi nombre es MANI, un Chatbot de Inteligencia Artificial y puedo ayudarte a encontrar las respuestas que buscas sobre nuestro calzado. ¿En qué puedo ayudarte?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("precio") || message.includes("costo") || message.includes("cuanto")) {
      return "Nuestros precios varían según el modelo y marca. Puedes ver todos los precios en nuestras categorías: Niños, Niñas, Mujeres y Hombres. ¿Te interesa alguna categoría en particular?"
    }

    if (message.includes("talla") || message.includes("tamaño") || message.includes("medida")) {
      return "Manejamos tallas desde la 22 hasta la 45. Te recomiendo revisar nuestra guía de tallas en cada producto. ¿Necesitas ayuda para encontrar tu talla ideal?"
    }

    if (message.includes("envio") || message.includes("entrega") || message.includes("delivery")) {
      return "Realizamos envíos a todo el país. El tiempo de entrega es de 2-5 días hábiles. ¿Te gustaría conocer más detalles sobre nuestras opciones de envío?"
    }

    if (message.includes("hola") || message.includes("buenos") || message.includes("buenas")) {
      return "¡Hola! ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre nuestros productos, precios, tallas, envíos y más."
    }

    if (message.includes("gracias")) {
      return "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?"
    }

    return "Entiendo tu consulta. Te recomiendo navegar por nuestras categorías o contactar a nuestro equipo de ventas. ¿Hay algo específico que te gustaría saber?"
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getResponse(inputMessage),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Botón flotante del chatbot */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#2563eb",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1d4ed8"
            e.currentTarget.style.transform = "scale(1.1)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb"
            e.currentTarget.style.transform = "scale(1)"
          }}
        >
          {isOpen ? (
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Ventana del chat */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "24px",
            width: "320px",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            border: "1px solid #e5e7eb",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header del chat */}
          <div
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "16px",
              borderRadius: "12px 12px 0 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🌟</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>MANI - Asistente IA</h3>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>Especialista en calzado</p>
            </div>
          </div>

          {/* Área de mensajes */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent: message.isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "12px",
                    borderRadius: "12px",
                    backgroundColor: message.isUser ? "#2563eb" : "#f3f4f6",
                    color: message.isUser ? "white" : "#374151",
                    borderBottomRightRadius: message.isUser ? "4px" : "12px",
                    borderBottomLeftRadius: message.isUser ? "12px" : "4px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>{message.text}</p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "11px",
                      opacity: 0.7,
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input para escribir mensajes */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db"
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: "8px 12px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb"
              }}
            >
              <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

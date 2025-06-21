"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Recuperación de contraseña para:", email)
    setIsSubmitted(true)
    // Aquí iría la lógica para enviar el email de recuperación
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="bg-gray-100 py-2 px-4 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-gray-600">+593 99 999 9999</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-600">main.companies@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Iniciar Sesión
            </Link>
            <Link href="/register" className="text-gray-600 hover:text-gray-900">
              Registrarte ahora
            </Link>
          </div>
        </div>
      </div>

      {/* Header with logo and navigation */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                <div className="flex flex-col items-center">
                  <span className="text-2xl tracking-wider">MAIN</span>
                  <span className="text-[10px] tracking-wider">Management & Innovations</span>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Mujer
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Hombre
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Niñas
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Niños
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Nuevos Productos
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Marcas
              </Link>
            </nav>
            <div className="flex items-center">
              <button className="text-gray-700 hover:text-gray-900">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Recovery banner */}
      <div className="bg-gray-300 py-3">
        <div className="container mx-auto text-center">
          <h2 className="text-gray-700 uppercase text-sm">RECUPERACIÓN DE CONTRASEÑA</h2>
        </div>
      </div>

      {/* Main content - Password recovery form */}
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!isSubmitted ? (
              <div className="bg-gray-100 p-8 rounded">
                <p className="text-center text-gray-600 text-sm mb-8">
                  Por favor ingrese su dirección de correo electrónico abajo. Recibirás un enlace para restablecer tu
                  contraseña.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm text-gray-600">
                      Su dirección de correo electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" className="bg-black hover:bg-gray-800 text-white rounded px-8 py-2">
                      Recuperar
                    </Button>
                  </div>
                </form>

                <div className="text-center mt-6">
                  <Link href="/login" className="text-sm text-gray-600 hover:underline">
                    ← Volver al inicio de sesión
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 p-8 rounded">
                <div className="text-center">
                  <div className="mb-4">
                    <svg
                      className="mx-auto h-12 w-12 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 24l4 4 8-8" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-green-800 mb-2">¡Correo enviado!</h3>
                  <p className="text-green-700 text-sm mb-6">
                    Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor revisa tu bandeja de
                    entrada y sigue las instrucciones.
                  </p>
                  <div className="space-y-3">
                    <Link href="/login">
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded px-6 py-2">
                        Volver al inicio de sesión
                      </Button>
                    </Link>
                    <div>
                      <button onClick={() => setIsSubmitted(false)} className="text-sm text-green-600 hover:underline">
                        ¿No recibiste el correo? Intentar de nuevo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 - Logo and contact */}
            <div className="space-y-4">
              <div className="bg-white p-2 inline-block">
                <div className="flex flex-col items-center">
                  <span className="text-black text-xl tracking-wider">MAIN</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span>UCT</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>main.companies@gmail.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>+593 04 600-8100</span>
                </p>
              </div>
            </div>

            {/* Column 2 - Information */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">INFORMACIÓN</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Política de Envíos y Cambios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Nuestra Empresa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contáctenos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Customer Service */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">SERVICIO AL CLIENTE</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Noticias
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Productos vistos recientemente
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Compare la lista de productos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Políticas Generales de Protección De Datos Personales
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - My Account */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">MI CUENTA</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Órdenes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Direcciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Carrito de compras
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Lista de deseos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-gray-800" />

          {/* Social media and newsletter */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-sm mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-gray-300">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <h3 className="font-bold text-sm mb-4">Boletín</h3>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Introduzca su correo electrónico aquí..."
                  className="rounded-l bg-white text-black border-0 min-w-[250px]"
                />
                <Button className="bg-gray-700 hover:bg-gray-600 text-white rounded-r">Suscribirse</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

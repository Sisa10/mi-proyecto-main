"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validación básica
    if (!formData.email || !formData.password) {
      alert("Por favor completa todos los campos")
      setIsLoading(false)
      return
    }

    try {
      // Verificar si es un administrador (puedes cambiar esta lógica según tus necesidades)
      const isAdmin = formData.email.includes("admin") || formData.email === "admin@main.com"

      // Simular llamada a API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          isAdmin: isAdmin,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        if (isAdmin) {
          // Guardar token de administrador y redirigir al dashboard
          localStorage.setItem("adminToken", data.token || "admin-token")
          localStorage.setItem("userRole", "admin")
          localStorage.setItem("userEmail", formData.email)
          router.push("/admin/dashboard")
        } else {
          // Guardar token de usuario regular y redirigir al home
          localStorage.setItem("userToken", data.token || "user-token")
          localStorage.setItem("userRole", "user")
          localStorage.setItem("userEmail", formData.email)
          router.push("/")
        }
      } else {
        alert("Credenciales inválidas")
      }
    } catch (error) {
      console.error("Error en login:", error)
      // Para desarrollo, simular login exitoso
      const isAdmin = formData.email.includes("admin") || formData.email === "admin@main.com"

      if (isAdmin) {
        localStorage.setItem("adminToken", "admin-token-demo")
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userEmail", formData.email)
        router.push("/admin/dashboard")
      } else {
        localStorage.setItem("userToken", "user-token-demo")
        localStorage.setItem("userRole", "user")
        localStorage.setItem("userEmail", formData.email)
        router.push("/")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
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
              <Link href="/mujer" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Mujer
              </Link>
              <Link href="/hombre" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Hombre
              </Link>
              <Link href="/ninas" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Niñas
              </Link>
              <Link href="/ninos" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Niños
              </Link>
              <Link
                href="/nuevos-productos"
                className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium"
              >
                Nuevos Productos
              </Link>
              <Link href="/marcas" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
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

      {/* Welcome banner */}
      <div className="bg-gray-300 py-3">
        <div className="container mx-auto text-center">
          <h2 className="text-gray-700 uppercase text-sm">BIENVENIDOS</h2>
        </div>
      </div>

      {/* Main content - Login section */}
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            {/* Left column - New Administrator */}
            <div className="w-full md:w-1/2 bg-gray-100 p-6">
              <h2 className="text-xl font-medium text-center mb-6">Nuevo Administrador</h2>
              <p className="text-gray-600 text-sm mb-8">
                Al crear una cuenta de administrador, podrá gestionar eficientemente el inventario, supervisar el estado
                de los productos y realizar un seguimiento detallado de las operaciones realizadas
              </p>
              <div className="flex justify-center mt-8">
                <Link href="/register">
                  <Button className="bg-black hover:bg-gray-800 text-white rounded px-8 py-2">Registrate ahora</Button>
                </Link>
              </div>
            </div>

            {/* Right column - Login form */}
            <div className="w-full md:w-1/2 bg-gray-100 p-6">
              <h2 className="text-xl font-medium text-center mb-6">Iniciar sesión</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-gray-600">
                    Correo electrónico:
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                  <p className="text-xs text-gray-500">💡 Tip: Usa un email con "admin" para acceso de administrador</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm text-gray-600">
                    Contraseña:
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded"
                    placeholder="Tu contraseña"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      name="remember"
                      checked={formData.remember}
                      onCheckedChange={(checked) => setFormData({ ...formData, remember: checked === true })}
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      ¿Me recuerdas?
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
                    ¿Olvidó su contraseña?
                  </Link>
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black hover:bg-gray-800 text-white rounded px-8 py-2 disabled:opacity-50"
                  >
                    {isLoading ? "Ingresando..." : "Ingresar"}
                  </Button>
                </div>
              </form>
            </div>
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

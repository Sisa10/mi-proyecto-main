"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    interest: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptPrivacy: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registro:", formData)
    // Aquí iría la lógica de registro
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

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

      {/* Register banner */}
      <div className="bg-gray-300 py-3">
        <div className="container mx-auto text-center">
          <h2 className="text-gray-700 uppercase text-sm">REGISTRATE AHORA</h2>
        </div>
      </div>

      {/* Main content - Register form */}
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Data Section */}
              <div className="bg-gray-100 p-6 rounded">
                <h2 className="text-lg font-medium text-center mb-6">Sus datos personales</h2>

                {/* Interest Selection */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-2">¿Qué lo interesa más?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="interest"
                        value="hombre"
                        checked={formData.interest === "hombre"}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="mr-2"
                      />
                      Estilos de Hombre
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="interest"
                        value="mujer"
                        checked={formData.interest === "mujer"}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="mr-2"
                      />
                      Estilos de Mujer
                    </label>
                  </div>
                </div>

                {/* First Name */}
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm text-gray-600 mb-1">
                    Primer nombre <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm text-gray-600 mb-1">
                    Apellidos <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* Birth Date */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Fecha de nacimiento</label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.birthDay}
                      onValueChange={(value) => setFormData({ ...formData, birthDay: value })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Día" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.birthMonth}
                      onValueChange={(value) => setFormData({ ...formData, birthMonth: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Mes" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => (
                          <SelectItem key={month} value={(index + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.birthYear}
                      onValueChange={(value) => setFormData({ ...formData, birthYear: value })}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Año" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="bg-gray-100 p-6 rounded">
                <h2 className="text-lg font-medium text-center mb-6">Su contraseña</h2>

                {/* Password */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                    Contraseña <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm text-gray-600 mb-1">
                    Confirmar contraseña <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked === true })}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Si acepto los Términos y Condiciones
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.acceptPrivacy}
                    onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked === true })}
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Si acepto las Políticas de Protección de Datos
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-2 rounded uppercase"
                  disabled={!formData.acceptTerms || !formData.acceptPrivacy}
                >
                  REGISTRATE AHORA
                </Button>
              </div>
            </form>
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

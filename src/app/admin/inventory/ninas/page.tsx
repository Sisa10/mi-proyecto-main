"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Filter, Search, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const ninasProducts = [
  {
    id: 1,
    name: "Zapatilla Princesa",
    price: "$25.99",
    image: "/images/productos/13.jpg",
    colors: ["pink", "white", "purple"],
  },
  {
    id: 2,
    name: "Zapatilla Unicornio",
    price: "$28.99",
    image: "/images/productos/14.jpg",
    colors: ["pink", "rainbow"],
  },
  {
    id: 3,
    name: "Zapatilla Flores",
    price: "$22.99",
    image: "/images/productos/15.jpg",
    colors: ["pink", "yellow"],
  },
  {
    id: 4,
    name: "Zapatilla Mariposa",
    price: "$24.50",
    image: "/images/productos/16.jpg",
    colors: ["purple", "pink"],
  },
]

export default function NinasInventory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [itemsPerPage, setItemsPerPage] = useState("48")
  const [sortBy, setSortBy] = useState("Creado en")

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      black: "bg-black",
      white: "bg-white border border-gray-300",
      gray: "bg-gray-500",
      red: "bg-red-500",
      blue: "bg-blue-500",
      navy: "bg-blue-900",
      brown: "bg-amber-800",
      beige: "bg-amber-100",
      yellow: "bg-yellow-500",
      pink: "bg-pink-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500",
    }
    return colorMap[color] || "bg-gray-400"
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with admin buttons */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-2xl font-bold">
                <div className="flex flex-col items-center">
                  <span className="text-2xl tracking-wider">MAIN</span>
                  <span className="text-[10px] tracking-wider">Management & Innovations</span>
                </div>
              </Link>
            </div>
            <nav className="flex space-x-6">
              <Link href="/admin/inventory/agregar">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                  AGREGAR
                </Button>
              </Link>
              <Link href="/admin/inventory/eliminar">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                  ELIMINAR
                </Button>
              </Link>
              <Link href="/admin/inventory/actualizar">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                  ACTUALIZAR
                </Button>
              </Link>
              <Link href="/admin/inventory/stock">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                  STOCK
                </Button>
              </Link>
            </nav>
            <div className="flex items-center">
              <Search className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-600 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-white">
            <Link href="/admin/dashboard" className="hover:text-gray-300">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/admin/inventory/ninas" className="hover:text-gray-300">
              NIÑAS
            </Link>
            <span>/</span>
            <span>Deportivos</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Filters and Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filtrar por atributos</span>
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Formato:</span>
                <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                    <SelectItem value="96">96</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Creado en">Creado en</SelectItem>
                    <SelectItem value="Precio">Precio</SelectItem>
                    <SelectItem value="Nombre">Nombre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
          >
            {ninasProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer bg-white">
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="text-center">
                  <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-lg font-semibold mb-3">{product.price}</p>

                  {/* Color Options */}
                  <div className="flex justify-center space-x-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 border-gray-300 ${getColorClass(color)}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
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

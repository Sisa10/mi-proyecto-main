"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Grid,
  List,
  Filter,
  Search,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShoppingCart,
  Heart,
  Star,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

const products = [
  {
    id: 1,
    name: "Zapatilla Princesa",
    price: 19.99,
    image: "/images/ninas/Na_1.jpg",
    colors: ["pink", "white", "purple"],
    description: "Zapatillas con diseño de princesa, brillos y colores pastel. Perfectas para pequeñas fashionistas.",
    rating: 4.5,
    reviews: 25,
    isNew: true,
  },
  {
    id: 2,
    name: "Ballerinas Elegantes",
    price: 16.5,
    image: "/images/ninas/Na_2.jpg",
    colors: ["pink", "white"],
    description: "Ballerinas cómodas y elegantes para ocasiones especiales y uso diario.",
    rating: 4.2,
    reviews: 18,
    isOnSale: true,
  },
  {
    id: 3,
    name: "Zapatilla Unicornio",
    price: 21.99,
    image: "/images/ninas/Na_3.jpg",
    colors: ["rainbow", "white"],
    description: "Zapatillas mágicas con diseño de unicornio y detalles brillantes que cambian de color.",
    rating: 4.8,
    reviews: 32,
  },
  {
    id: 4,
    name: "Sandalia Floral",
    price: 18.99,
    image: "/images/ninas/Na_4.jpg",
    colors: ["pink", "yellow"],
    description: "Sandalias con diseño floral y cierre de velcro, ideales para el verano.",
    rating: 4.0,
    reviews: 12,
    isNew: true,
  },
  {
    id: 5,
    name: "Botitas Fashion",
    price: 26.99,
    image: "/images/ninas/Na_5.jpg",
    colors: ["pink", "purple"],
    description: "Botitas con tacón bajo y diseño moderno, perfectas para niñas que quieren verse mayores.",
    rating: 4.6,
    reviews: 28,
  },
  {
    id: 6,
    name: "Zapatilla Deportiva Rosa",
    price: 23.5,
    image: "/images/ninas/Na_6.jpg",
    colors: ["pink", "white"],
    description: "Zapatillas deportivas en tonos rosa con tecnología de amortiguación para actividades físicas.",
    rating: 4.3,
    reviews: 20,
    isOnSale: true,
  },
]

const brands = ["Nike", "Adidas", "Puma", "Reebok"]
const sizes = ["28", "29", "30", "31", "32", "33", "34"]
const colors = ["pink", "white", "purple", "rainbow", "yellow"]

export default function NinasPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [itemsPerPage, setItemsPerPage] = useState("40")
  const [sortBy, setSortBy] = useState("created")

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
      rainbow: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500",
    }
    return colorMap[color] || "bg-gray-400"
  }

  const renderRating = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-500" fill="url(#half)" />)
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
      }
    }
    return stars
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
            <Link href="/login">
              <Button className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm">Empleado/Admin</Button>
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
              <Link href="/hombre" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Hombres
              </Link>
              <Link href="/mujer" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Mujeres
              </Link>
              <Link href="/ninos" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Niños
              </Link>
              <Link
                href="/ninas"
                className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium border-b-2 border-gray-900"
              >
                Niñas
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-gray-900">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <Heart className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/ninas" className="hover:text-black">
              NIÑAS
            </Link>
            <span>/</span>
            <span>Calzado</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Marcas</h3>
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand}`} />
                  <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Tallas</h3>
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <label htmlFor={`size-${size}`} className="text-sm text-gray-700">
                    {size}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Colores</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox id={`color-${color}`} />
                    <label htmlFor={`color-${color}`} className="text-sm text-gray-700 capitalize">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Precio</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Min" className="text-sm" />
                  <Input placeholder="Max" className="text-sm" />
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Aplicar
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <section className="w-full md:w-3/4">
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
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="60">60</SelectItem>
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
                      <SelectItem value="created">Creado en</SelectItem>
                      <SelectItem value="price">Precio</SelectItem>
                      <SelectItem value="name">Nombre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
            >
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer relative">
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Hover Description */}
                    <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <div className="text-white text-center">
                        <p className="text-sm">{product.description}</p>
                      </div>
                    </div>

                    {/* Badges */}
                    {product.isNew && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                        Nuevo
                      </div>
                    )}
                    {product.isOnSale && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                        Oferta
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-lg font-semibold mb-3">${product.price}</p>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-center mb-2">
                      {renderRating(product.rating)}
                      <span className="text-gray-600 text-sm ml-1">({product.reviews})</span>
                    </div>

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
          </section>
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

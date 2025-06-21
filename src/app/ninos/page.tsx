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
    name: "Zapatilla Deportiva Niño",
    price: 18.99,
    image: "/images/ninos/No_1.jpg",
    colors: ["blue", "red", "black"],
    description:
      "Zapatillas deportivas para niños con suela antideslizante y diseño colorido. Perfectas para jugar y correr.",
    rating: 4.5,
    reviews: 25,
    isNew: true,
  },
  {
    id: 2,
    name: "Tenis Casual Niño",
    price: 22.5,
    image: "/images/ninos/No_2.jpg",
    colors: ["white", "navy"],
    description: "Tenis casuales cómodos para uso diario. Fáciles de poner y quitar con velcro.",
    rating: 4.2,
    reviews: 18,
  },
  {
    id: 3,
    name: "Zapatilla Running Niño",
    price: 25.99,
    image: "/images/ninos/No_3.jpg",
    colors: ["green", "orange"],
    description: "Zapatillas de running ligeras con tecnología de amortiguación para pequeños atletas.",
    rating: 4.8,
    reviews: 32,
    isOnSale: true,
  },
  {
    id: 4,
    name: "Botines Fútbol Niño",
    price: 28.99,
    image: "/images/ninos/No_4.jpg",
    colors: ["black", "white"],
    description: "Botines de fútbol con tacos de goma para césped artificial y natural.",
    rating: 4.0,
    reviews: 12,
  },
  {
    id: 5,
    name: "Zapatilla Skate Niño",
    price: 24.99,
    image: "/images/ninos/No_5.jpg",
    colors: ["black", "gray"],
    description: "Zapatillas de skate resistentes con suela de goma vulcanizada.",
    rating: 4.6,
    reviews: 28,
  },
  {
    id: 6,
    name: "Sandalia Deportiva Niño",
    price: 16.99,
    image: "/images/ninos/No_6.jpg",
    colors: ["blue", "red"],
    description: "Sandalias deportivas con cierre de velcro, perfectas para el verano.",
    rating: 4.3,
    reviews: 20,
    isOnSale: true,
  },
  {
    id: 7,
    name: "Zapatilla Urbana Niño",
    price: 21.99,
    image: "/images/ninos/No_7.jpg",
    colors: ["yellow", "pink"],
    description: "Zapatillas urbanas con diseño moderno y ajuste cómodo para el día a día.",
    rating: 4.7,
    reviews: 35,
    isNew: true,
  },
  {
    id: 8,
    name: "Zapatilla Trekking Niño",
    price: 31.5,
    image: "/images/ninos/No_8.jpg",
    colors: ["brown", "beige"],
    description: "Zapatillas de trekking robustas para aventuras al aire libre. Resistentes al agua y con buen agarre.",
    rating: 4.4,
    reviews: 15,
  },
]

const brands = ["Nike", "Adidas", "Puma", "Reebok", "New Balance"]
const sizes = ["28", "29", "30", "31", "32", "33", "34", "35"]
const colorsFilter = ["black", "white", "gray", "red", "blue", "green", "yellow", "pink", "brown", "beige"]

export default function NinosPage() {
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
    }
    return colorMap[color] || "bg-gray-400"
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
              <Link
                href="/ninos"
                className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium border-b-2 border-gray-900"
              >
                Niños
              </Link>
              <Link href="/ninas" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
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
            <Link href="/ninos" className="hover:text-black">
              NIÑOS
            </Link>
            <span>/</span>
            <span>Deportivos</span>
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
              <ul className="space-y-2">
                {brands.map((brand) => (
                  <li key={brand} className="flex items-center">
                    <Checkbox id={`brand-${brand}`} className="mr-2" />
                    <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700">
                      {brand}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Tallas</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-md hover:bg-gray-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Colores</h3>
              <div className="flex flex-wrap gap-2">
                {colorsFilter.map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full cursor-pointer ${getColorClass(color)}`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div>
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
          <div className="w-full md:w-3/4">
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

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col">
                      {product.isNew && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md mb-1">Nuevo</span>
                      )}
                      {product.isOnSale && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">Oferta</span>
                      )}
                    </div>

                    {/* Hover Description */}
                    <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <div className="text-white text-center">
                        <p className="text-sm">{product.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-700">{product.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
                    </div>
                    <p className="text-lg font-semibold mb-3">${product.price}</p>

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

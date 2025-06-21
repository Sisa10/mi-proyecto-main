"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Facebook, Twitter, Instagram, Youtube, ShoppingCart, Heart, Filter, Grid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HombrePage() {
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({})
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(true)
  const [sortBy, setSortBy] = useState("featured")
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    priceRange: [0, 100] as [number, number],
  })

  const menProducts = [
    {
      id: 1,
      name: "Zapatillas Deportivas Running",
      brand: "Nike",
      price: 95.99,
      originalPrice: 120.0,
      image: "/images/hombres/H_1.jpg",
      colors: ["black", "white", "gray"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      rating: 4.6,
      reviews: 189,
      isNew: false,
      isOnSale: true,
      description:
        "Zapatillas de running con tecnología de amortiguación avanzada para máximo confort durante el ejercicio.",
    },
    {
      id: 2,
      name: "Zapatos Casuales de Cuero",
      brand: "Calvin Klein",
      price: 135.0,
      originalPrice: null,
      image: "/images/hombres/H_2.jpg",
      colors: ["brown", "black"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      rating: 4.8,
      reviews: 156,
      isNew: true,
      isOnSale: false,
      description: "Zapatos casuales de cuero premium, perfectos para ocasiones formales y semi-formales.",
    },
    {
      id: 3,
      name: "Botas de Trabajo Resistentes",
      brand: "Caterpillar",
      price: 165.5,
      originalPrice: 190.0,
      image: "/images/hombres/H_3.jpg",
      colors: ["brown", "black"],
      sizes: ["40", "41", "42", "43", "44", "45", "46"],
      rating: 4.7,
      reviews: 234,
      isNew: false,
      isOnSale: true,
      description: "Botas de trabajo con puntera de acero y suela antideslizante para máxima seguridad laboral.",
    },
    {
      id: 4,
      name: "Zapatillas Urbanas",
      brand: "Adidas",
      price: 85.0,
      originalPrice: null,
      image: "/images/hombres/H_4.jpg",
      colors: ["white", "gray", "navy"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      rating: 4.4,
      reviews: 298,
      isNew: false,
      isOnSale: false,
      description: "Zapatillas urbanas con diseño moderno y comodidad excepcional para el día a día.",
    },
    {
      id: 5,
      name: "Zapatos Oxford Clásicos",
      brand: "Clarks",
      price: 145.0,
      originalPrice: null,
      image: "/images/hombres/H_5.jpg",
      colors: ["black", "brown"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      rating: 4.9,
      reviews: 167,
      isNew: true,
      isOnSale: false,
      description: "Zapatos Oxford de cuero genuino con acabado clásico, ideales para eventos formales.",
    },
    {
      id: 6,
      name: "Sandalias Deportivas",
      brand: "Teva",
      price: 65.99,
      originalPrice: 80.0,
      image: "/images/hombres/H_6.jpg",
      colors: ["black", "brown", "navy"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      rating: 4.2,
      reviews: 145,
      isNew: false,
      isOnSale: true,
      description:
        "Sandalias deportivas con correas ajustables y suela de goma antideslizante para actividades al aire libre.",
    },
    {
      id: 7,
      name: "Botines Chelsea",
      brand: "Dr. Martens",
      price: 175.0,
      originalPrice: null,
      image: "/images/hombres/H_7.jpg",
      colors: ["black", "brown"],
      sizes: ["40", "41", "42", "43", "44"],
      rating: 4.8,
      reviews: 203,
      isNew: true,
      isOnSale: false,
      description: "Botines Chelsea de cuero resistente con elásticos laterales para fácil calce y estilo atemporal.",
    },
    {
      id: 8,
      name: "Zapatillas de Skate",
      brand: "Vans",
      price: 75.0,
      originalPrice: 90.0,
      image: "/images/hombres/H_8.jpg",
      colors: ["black", "white", "red"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      rating: 4.5,
      reviews: 312,
      isNew: false,
      isOnSale: true,
      description: "Zapatillas de skate con suela vulcanizada y diseño resistente para deportes extremos.",
    },
  ]

  const brands = ["Nike", "Adidas", "Calvin Klein", "Clarks", "Dr. Martens", "Vans", "Caterpillar", "Teva"]
  const sizes = ["39", "40", "41", "42", "43", "44", "45", "46"]
  const colors = [
    { name: "Negro", value: "black", class: "bg-black" },
    { name: "Blanco", value: "white", class: "bg-white border border-gray-300" },
    { name: "Marrón", value: "brown", class: "bg-amber-800" },
    { name: "Gris", value: "gray", class: "bg-gray-500" },
    { name: "Azul Marino", value: "navy", class: "bg-blue-900" },
    { name: "Rojo", value: "red", class: "bg-red-500" },
  ]

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      black: "bg-black",
      white: "bg-white border border-gray-300",
      gray: "bg-gray-500",
      red: "bg-red-500",
      navy: "bg-blue-900",
      brown: "bg-amber-800",
    }
    return colorMap[color] || "bg-gray-400"
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ))
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
              <Link href="/mujer" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
                Mujeres
              </Link>
              <Link
                href="/hombre"
                className="text-gray-900 font-bold uppercase text-sm border-b-2 border-gray-900 pb-1"
              >
                Hombres
              </Link>
              <Link href="/ninos" className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium">
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

      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Inicio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Hombres</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Calzado para Hombre</h1>
            <p className="text-gray-600 max-w-2xl">
              Explora nuestra colección masculina de calzado. Desde zapatillas deportivas hasta zapatos formales,
              encuentra el estilo perfecto que combine comodidad, durabilidad y diseño moderno.
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <aside className="w-64 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">Filtros</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                      ×
                    </Button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Precio</h4>
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

                  {/* Brands */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Marcas</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox id={`brand-${brand}`} />
                          <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700 cursor-pointer">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Tallas</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          className="border border-gray-300 rounded px-3 py-1 text-sm hover:border-gray-900 hover:bg-gray-50"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Colores</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          className={`w-8 h-8 rounded-full ${color.class} hover:scale-110 transition-transform border-2 border-transparent hover:border-gray-400`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center gap-4">
                  {!showFilters && (
                    <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  )}
                  <span className="text-sm text-gray-600">{menProducts.length} productos encontrados</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Ordenar por:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Destacados</SelectItem>
                        <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                        <SelectItem value="newest">Más Nuevos</SelectItem>
                        <SelectItem value="rating">Mejor Valorados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex border rounded">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {menProducts.map((product) => (
                  <Link key={product.id} href={`/producto/${product.id}`} className="group">
                    {viewMode === "grid" ? (
                      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border">
                        <div className="relative">
                          {product.isNew && (
                            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
                              NUEVO
                            </span>
                          )}
                          {product.isOnSale && (
                            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
                              OFERTA
                            </span>
                          )}
                          <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={300}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          {/* Hover Description */}
                          <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <div className="text-white text-center">
                              <p className="text-sm">{product.description}</p>
                            </div>
                          </div>
                          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                          <div className="flex items-center mb-2">
                            {renderStars(product.rating)}
                            <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1 mb-3">
                            {product.colors.map((color, index) => (
                              <button
                                key={index}
                                className={`w-4 h-4 rounded-full ${getColorClass(color)} hover:scale-110 transition-transform`}
                              />
                            ))}
                          </div>
                          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                            Agregar al Carrito
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-sm border p-4 flex gap-4">
                        <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                          {/* Hover Description for List View */}
                          <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                            <div className="text-white text-center">
                              <p className="text-xs">{product.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm text-gray-600">{product.brand}</p>
                              <h3 className="font-medium text-gray-900">{product.name}</h3>
                            </div>
                            <div className="flex gap-1">
                              {product.isNew && (
                                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">NUEVO</span>
                              )}
                              {product.isOnSale && (
                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">OFERTA</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            {renderStars(product.rating)}
                            <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                              )}
                            </div>
                            <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                              Agregar al Carrito
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button size="sm" className="bg-gray-900 text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Siguiente
                  </Button>
                </div>
              </div>
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

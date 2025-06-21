"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Datos de ejemplo de productos con stock
const sampleProducts = [
  {
    id: 1,
    name: "Zapatilla Cocodrilo",
    price: "$30.00",
    category: "Mujeres",
    brand: "Cocodrilo",
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    image: "/placeholder.svg?height=60&width=60",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Zapatilla Nike",
    price: "$45.99",
    category: "Hombres",
    brand: "Nike",
    currentStock: 3,
    minStock: 5,
    maxStock: 30,
    image: "/placeholder.svg?height=60&width=60",
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    name: "Zapatilla Princesa",
    price: "$25.99",
    category: "Niñas",
    brand: "Princess",
    currentStock: 25,
    minStock: 8,
    maxStock: 40,
    image: "/placeholder.svg?height=60&width=60",
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    name: "Zapatilla Superhéroe",
    price: "$27.99",
    category: "Niños",
    brand: "Hero",
    currentStock: 0,
    minStock: 5,
    maxStock: 25,
    image: "/placeholder.svg?height=60&width=60",
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    name: "Zapatilla Adidas",
    price: "$55.99",
    category: "Hombres",
    brand: "Adidas",
    currentStock: 45,
    minStock: 15,
    maxStock: 60,
    image: "/placeholder.svg?height=60&width=60",
    lastUpdated: "2024-01-11",
  },
]

export default function StockManagement() {
  const [products, setProducts] = useState(sampleProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || product.category.toLowerCase() === filterCategory

    let matchesStatus = true
    if (filterStatus === "low") {
      matchesStatus = product.currentStock <= product.minStock
    } else if (filterStatus === "out") {
      matchesStatus = product.currentStock === 0
    } else if (filterStatus === "normal") {
      matchesStatus = product.currentStock > product.minStock && product.currentStock < product.maxStock
    } else if (filterStatus === "high") {
      matchesStatus = product.currentStock >= product.maxStock
    }

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStockStatus = (product: (typeof sampleProducts)[0]) => {
    if (product.currentStock === 0) return { status: "out", label: "Agotado", class: "bg-red-100 text-red-800" }
    if (product.currentStock <= product.minStock)
      return { status: "low", label: "Stock Bajo", class: "bg-yellow-100 text-yellow-800" }
    if (product.currentStock >= product.maxStock)
      return { status: "high", label: "Stock Alto", class: "bg-blue-100 text-blue-800" }
    return { status: "normal", label: "Normal", class: "bg-green-100 text-green-800" }
  }

  const updateStock = (productId: number, newStock: number) => {
    if (newStock < 0) return

    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, currentStock: newStock, lastUpdated: new Date().toISOString().split("T")[0] }
          : product,
      ),
    )

    setAlertMessage(`Stock actualizado exitosamente`)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleStockChange = (productId: number, value: string) => {
    const newStock = Number.parseInt(value) || 0
    updateStock(productId, newStock)
  }

  const adjustStock = (productId: number, adjustment: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      const newStock = Math.max(0, product.currentStock + adjustment)
      updateStock(productId, newStock)
    }
  }

  // Estadísticas
  const totalProducts = products.length
  const lowStockProducts = products.filter((p) => p.currentStock <= p.minStock).length
  const outOfStockProducts = products.filter((p) => p.currentStock === 0).length
  const totalStockValue = products.reduce(
    (sum, p) => sum + p.currentStock * Number.parseFloat(p.price.replace("$", "")),
    0,
  )

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
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium bg-gray-100"
                >
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
              PACS
            </Link>
            <span>/</span>
            <span>Stock</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {showAlert && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{alertMessage}</AlertDescription>
            </Alert>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Productos</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
                  <p className="text-2xl font-bold text-gray-900">{lowStockProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <TrendingDown className="w-8 h-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Agotados</p>
                  <p className="text-2xl font-bold text-gray-900">{outOfStockProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-900">${totalStockValue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="mujeres">Mujeres</SelectItem>
                    <SelectItem value="hombres">Hombres</SelectItem>
                    <SelectItem value="niñas">Niñas</SelectItem>
                    <SelectItem value="niños">Niños</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado del Stock</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Stock Bajo</SelectItem>
                    <SelectItem value="out">Agotado</SelectItem>
                    <SelectItem value="high">Stock Alto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterCategory("all")
                    setFilterStatus("all")
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock Actual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gestión de Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Última Actualización
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product)
                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <Image
                                className="h-12 w-12 rounded-lg object-cover"
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={48}
                                height={48}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <span className="font-medium">{product.currentStock}</span>
                            <span className="text-gray-500"> / {product.maxStock}</span>
                          </div>
                          <div className="text-xs text-gray-500">Mín: {product.minStock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.class}`}
                          >
                            {stockStatus.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => adjustStock(product.id, -1)}
                              disabled={product.currentStock === 0}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              min="0"
                              value={product.currentStock}
                              onChange={(e) => handleStockChange(product.id, e.target.value)}
                              className="w-16 text-center text-sm"
                            />
                            <Button variant="outline" size="sm" onClick={() => adjustStock(product.id, 1)}>
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.lastUpdated}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-500">
                  {searchTerm || filterCategory !== "all" || filterStatus !== "all"
                    ? "No se encontraron productos que coincidan con los filtros aplicados."
                    : "No hay productos disponibles."}
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

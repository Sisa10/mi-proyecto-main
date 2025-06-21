"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Trash2, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Datos de ejemplo de productos
const sampleProducts = [
  {
    id: 1,
    name: "Zapatilla Cocodrilo",
    price: "$30.00",
    category: "Mujeres",
    brand: "Cocodrilo",
    stock: 15,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Zapatilla Nike",
    price: "$45.99",
    category: "Hombres",
    brand: "Nike",
    stock: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Zapatilla Princesa",
    price: "$25.99",
    category: "Niñas",
    brand: "Princess",
    stock: 12,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Zapatilla Superhéroe",
    price: "$27.99",
    category: "Niños",
    brand: "Hero",
    stock: 6,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function EliminarProducto() {
  const [products, setProducts] = useState(sampleProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [showAlert, setShowAlert] = useState(false)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) return

    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar ${selectedProducts.length} producto(s)? Esta acción no se puede deshacer.`,
    )

    if (confirmDelete) {
      setProducts((prev) => prev.filter((product) => !selectedProducts.includes(product.id)))
      setSelectedProducts([])
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const handleDeleteSingle = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar "${product?.name}"? Esta acción no se puede deshacer.`,
    )

    if (confirmDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productId))
      setSelectedProducts((prev) => prev.filter((id) => id !== productId))
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
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
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium bg-gray-100"
                >
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
              PACS
            </Link>
            <span>/</span>
            <span>Eliminar</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-8">
          {showAlert && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">Producto(s) eliminado(s) exitosamente.</AlertDescription>
            </Alert>
          )}

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Eliminar Productos</h1>

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSelectAll} disabled={filteredProducts.length === 0}>
                  {selectedProducts.length === filteredProducts.length ? "Deseleccionar Todo" : "Seleccionar Todo"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteSelected}
                  disabled={selectedProducts.length === 0}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar Seleccionados ({selectedProducts.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className={selectedProducts.includes(product.id) ? "bg-red-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
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
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.brand}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.stock > 10
                              ? "bg-green-100 text-green-800"
                              : product.stock > 5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSingle(product.id)}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  {searchTerm
                    ? "No se encontraron productos que coincidan con tu búsqueda."
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

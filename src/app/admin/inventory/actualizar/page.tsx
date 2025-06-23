'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Search, Edit, Upload, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const sizes = ["24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"]
const colors = [
  { name: "Negro", value: "black", class: "bg-black" },
  { name: "Blanco", value: "white", class: "bg-white border border-gray-300" },
  { name: "Rojo", value: "red", class: "bg-red-500" },
  { name: "Azul", value: "blue", class: "bg-blue-500" },
  { name: "Verde", value: "green", class: "bg-green-500" },
  { name: "Amarillo", value: "yellow", class: "bg-yellow-500" },
  { name: "Rosa", value: "pink", class: "bg-pink-500" },
  { name: "Gris", value: "gray", class: "bg-gray-500" },
]

type Product = {
  id: number
  nombre: string
  precio: number
  categoria: { id: number, nombre: string }
  marca: string
  color: string
  tallas: string[]
  stock: number
  descripcion?: string
  especificaciones?: string
  etiquetas?: string
  imagen_nombre_archivo?: string
}

export default function ActualizarProducto() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("descripcion");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    categoria_id: "",
    marca: "",
    color: "",
    tallas: [] as string[],
    stock: 0,
    descripcion: "",
    especificaciones: "",
    etiquetas: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken') || ''}`,
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.marca.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product.id);
    setFormData({
      nombre: product.nombre,
      precio: product.precio.toString(),
      categoria_id: product.categoria.id.toString(),
      marca: product.marca,
      color: product.color,
      tallas: product.tallas,
      stock: product.stock,
      descripcion: product.descripcion || "",
      especificaciones: product.especificaciones || "",
      etiquetas: product.etiquetas || "",
    });
    setSelectedImage(null);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      tallas: prev.tallas.includes(size) ? prev.tallas.filter((s) => s !== size) : [...prev.tallas, size],
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('precio', formData.precio.toString());
    formDataToSend.append('categoria_id', formData.categoria_id);
    formDataToSend.append('marca', formData.marca);
    formDataToSend.append('color', formData.color);
    formDataToSend.append('tallas', JSON.stringify(formData.tallas));
    formDataToSend.append('stock', formData.stock.toString());
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('especificaciones', formData.especificaciones);
    formDataToSend.append('etiquetas', formData.etiquetas);
    if (selectedImage) formDataToSend.append('image', selectedImage);

    try {
      const response = await fetch(`http://localhost:3000/products/${selectedProduct}`, {
        method: 'PUT',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken') || ''}`,
        },
      });
      if (response.ok) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        const updatedProduct = await response.json();
        const updatedProducts = products.map(p =>
          p.id === selectedProduct ? updatedProduct : p
        );
        setProducts(updatedProducts);
      } else {
        alert('Error al actualizar producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

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
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 uppercase text-sm font-medium bg-gray-100"
                >
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
            <span>Actualizar</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-8">
          {showAlert && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">Producto actualizado exitosamente.</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product Selection */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Seleccionar Producto</h2>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Product List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProduct === product.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`/images/${product.categoria.nombre}/${product.imagen_nombre_archivo || "placeholder.svg"}`}
                        alt={product.nombre}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.nombre}</p>
                        <p className="text-sm text-gray-500">
                          {product.marca} - ${product.precio}
                        </p>
                      </div>
                      {selectedProduct === product.id && <Edit className="w-4 h-4 text-blue-500" />}
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron productos que coincidan con tu búsqueda.
                </div>
              )}
            </div>

            {/* Right Column - Product Form */}
            <div className="lg:col-span-2">
              {selectedProduct ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Actualizar Producto</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Upload */}
                    <div className="space-y-4">
                      <div className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                        {selectedImage ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={URL.createObjectURL(selectedImage)}
                              alt="Producto"
                              fill
                              className="object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setSelectedImage(null)}
                            >
                              Cambiar
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg font-medium mb-2">ACTUALIZAR IMAGEN</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <Label htmlFor="image-upload" className="cursor-pointer">
                              <Button type="button" variant="outline">
                                Seleccionar Imagen
                              </Button>
                            </Label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                      {/* Product Name */}
                      <div>
                        <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                          Nombre del zapato
                        </Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange("nombre", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <Label htmlFor="precio" className="text-sm font-medium text-gray-700">
                          Precio
                        </Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="precio"
                            type="number"
                            step="0.01"
                            value={formData.precio}
                            onChange={(e) => handleInputChange("precio", e.target.value)}
                            className="pl-8"
                            required
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <Label htmlFor="categoria_id" className="text-sm font-medium text-gray-700">
                          Categoría
                        </Label>
                        <Select
                          value={formData.categoria_id}
                          onValueChange={(value) => handleInputChange("categoria_id", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Mujeres</SelectItem>
                            <SelectItem value="2">Hombres</SelectItem>
                            <SelectItem value="3">Niñas</SelectItem>
                            <SelectItem value="4">Niños</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Brand */}
                      <div>
                        <Label htmlFor="marca" className="text-sm font-medium text-gray-700">
                          Marca
                        </Label>
                        <Input
                          id="marca"
                          value={formData.marca}
                          onChange={(e) => handleInputChange("marca", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>

                      {/* Color */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">COLOR</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {colors.map((color) => (
                            <button
                              key={color.value}
                              type="button"
                              onClick={() => handleInputChange("color", color.value)}
                              className={`w-8 h-8 rounded-full border-2 ${color.class} ${
                                formData.color === color.value
                                  ? "border-gray-900 ring-2 ring-gray-300"
                                  : "border-gray-300"
                              }`}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Stock */}
                      <div>
                        <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
                          Stock
                        </Label>
                        <div className="flex items-center space-x-3 mt-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleInputChange("stock", Math.max(0, formData.stock - 1))}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="0"
                            value={formData.stock}
                            onChange={(e) => handleInputChange("stock", Number.parseInt(e.target.value) || 0)}
                            className="w-20 text-center"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleInputChange("stock", formData.stock + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mt-6">
                    <Label className="text-sm font-medium text-gray-700">Tallas disponibles</Label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                          className={`p-2 text-sm border rounded ${
                            formData.tallas.includes(size)
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tabs Section */}
                  <div className="mt-8">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                      <button
                        type="button"
                        onClick={() => setActiveTab("descripcion")}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeTab === "descripcion" ? "bg-black text-white" : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        DESCRIPCIÓN
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("especificaciones")}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeTab === "especificaciones" ? "bg-black text-white" : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ESPECIFICACIONES
                      </button>
                    </div>

                    <div className="mt-4">
                      {activeTab === "descripcion" && (
                        <div>
                          <Label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                            Descripción del producto
                          </Label>
                          <Textarea
                            id="descripcion"
                            value={formData.descripcion}
                            onChange={(e) => handleInputChange("descripcion", e.target.value)}
                            rows={4}
                            className="mt-1"
                          />
                        </div>
                      )}

                      {activeTab === "especificaciones" && (
                        <div>
                          <Label htmlFor="especificaciones" className="text-sm font-medium text-gray-700">
                            Especificaciones técnicas
                          </Label>
                          <Textarea
                            id="especificaciones"
                            value={formData.especificaciones}
                            onChange={(e) => handleInputChange("especificaciones", e.target.value)}
                            rows={4}
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Tags */}
                  <div className="mt-6">
                    <Label htmlFor="etiquetas" className="text-sm font-medium text-gray-700">
                      Etiquetas del producto
                    </Label>
                    <Input
                      id="etiquetas"
                      value={formData.etiquetas}
                      onChange={(e) => handleInputChange("etiquetas", e.target.value)}
                      placeholder="Ej: Deportivo, Casual, Cómodo (separadas por comas)"
                      className="mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end">
                    <Button type="submit" className="bg-black hover:bg-gray-800 text-white px-8 py-2">
                      ACTUALIZAR PRODUCTO
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona un producto para actualizar</h3>
                  <p className="text-gray-500">
                    Elige un producto de la lista de la izquierda para comenzar a editarlo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">INFORMACIÓN</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Política de Envíos y Cambios</Link></li>
                <li><Link href="#" className="hover:underline">Política de Privacidad</Link></li>
                <li><Link href="#" className="hover:underline">Términos y Condiciones</Link></li>
                <li><Link href="#" className="hover:underline">Preguntas Frecuentes</Link></li>
                <li><Link href="#" className="hover:underline">Nuestra Empresa</Link></li>
                <li><Link href="#" className="hover:underline">Contáctenos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">SERVICIO AL CLIENTE</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Noticias</Link></li>
                <li><Link href="#" className="hover:underline">Productos vistos recientemente</Link></li>
                <li><Link href="#" className="hover:underline">Compare la lista de productos</Link></li>
                <li><Link href="#" className="hover:underline">Políticas Generales de Protección De Datos Personales</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">MI CUENTA</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Órdenes</Link></li>
                <li><Link href="#" className="hover:underline">Direcciones</Link></li>
                <li><Link href="#" className="hover:underline">Carrito de compras</Link></li>
                <li><Link href="#" className="hover:underline">Lista de deseos</Link></li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-gray-800" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-sm mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-gray-300"><Facebook className="h-5 w-5" /></Link>
                <Link href="#" className="hover:text-gray-300"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="hover:text-gray-300"><Instagram className="h-5 w-5" /></Link>
                <Link href="#" className="hover:text-gray-300"><Youtube className="h-5 w-5" /></Link>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <h3 className="font-bold text-sm mb-4">Boletín</h3>
              <div className="flex">
                <Input type="email" placeholder="Introduzca su correo electrónico aquí..." className="rounded-l bg-white text-black border-0 min-w-[250px]" />
                <Button className="bg-gray-700 hover:bg-gray-600 text-white rounded-r">Suscribirse</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
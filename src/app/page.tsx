  "use client"

  import { useEffect, useState } from "react"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { Search, Facebook, Twitter, Instagram, Youtube, ShoppingCart, Heart } from "lucide-react"
  import Link from "next/link"
  import Image from "next/image"

  type Product = {
  esRecomendado: unknown
  esMasVendido: unknown
  esDestacado: unknown
  id: number
  nombre: string
  precio: number
  categoria: { id: number, nombre: string }
  marca: string
  color: string[]
  tallas: string[]
  imagen_nombre_archivo?: string
  }
  
  // Categorías para el filtro — si tu backend maneja otros IDs cámbialos aquí
const categories = [
  { id: "all", name: "Todos" },
  { id: "1", name: "Mujeres" },
  { id: "2", name: "Hombres" },
  { id: "3", name: "Niñas" },
  { id: "4", name: "Niños" },
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * Descarga los productos cada vez que cambia la categoría seleccionada.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const url =
          "http://localhost:3000/products" +
          (selectedCategory !== "all" ? `?category=${selectedCategory}` : "")
        const resp = await fetch(url)
        const data = await resp.json()
        setProducts(data)
      } catch (err) {
        console.error("Error al cargar productos:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [selectedCategory])

  // ————————————————————————————————————————————————————
  // DERIVAMOS LAS TRES LISTAS QUE NECESITA LA IU
  // ————————————————————————————————————————————————————
  const featuredProducts = products.filter((p) => p.esDestacado)
  const bestSellers = products.filter((p) => p.esMasVendido)
  const recommendedProducts = products.filter((p) => p.esRecomendado)

  /**
   * Devuelve la clase Tailwind correspondiente a cada color.
   */

  /** Formatea el precio para mostrarlo con símbolo de dólar */
  const displayPrice = (price: number | string) =>
    typeof price === "number" ? `$${price.toFixed(2)}` : price



    const news = [
      {
        id: 1,
        title: "TECNOLOGÍA COSIDO BLAKE",
        author: "COSIDO BLAKE",
        date: "Tuesday, October 26, 2021",
        description:
          "Toda mujer, además de sentirse bella, necesita estar cómoda en su día a día, por eso Campesi tiene zapatos con tecnologías especiales como el Cosido Blake que garantiza calidad, comodidad y suavidad en cada paso.",
        logo: "images/noticias/1.jpg",
      },
      {
        id: 2,
        title: "TECNOLOGÍA FLOAT",
        author: "FLOAT",
        date: "Tuesday, October 26, 2021",
        description:
          "Ferracini desarrolló una tecnología en gel natural, diseños versátiles, con tecnología Float que reduce el impacto de la pisada. El sistema Float funciona con espacio de 24 horas de confort de encuentro!",
        logo: "images/noticias/2.jpg",
      },
      {
        id: 3,
        title: "GUÍA DE TALLAS Y FASES",
        author: "TECNOLOGÍA",
        date: "Monday, October 25, 2021",
        description:
          "Kidy desarrolla calzados para los más pequeños. Nuestros planes son la Salud y el Comfort en tecnología, la innovación y la diversión!",
        logo: "images/noticias/3.jpg",
      },
    ]

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
                    <span className="text-[10px] tracking-wider">Management & Inventions</span>
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

        {/* Main content */}
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative">
            <div className="w-full h-96 bg-gray-200">
              <Image
                src="/images/General_home.jpg"
                alt="Hero Image - Zapatos deportivos"
                width={1200}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </section>

          {/* Category Section */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mujer */}
                <Link href="/mujer" className="relative group overflow-hidden rounded-lg">
                  <div className="aspect-[4/5] bg-gray-200">
                    <Image
                      src="/images/Mujer.jpg"
                      alt="Mujer"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2">MUJER</Button>
                  </div>
                </Link>

                {/* Hombre y Niñas */}
                <div className="space-y-6">
                  <Link href="/hombre" className="relative group overflow-hidden rounded-lg block">
                    <div className="aspect-[4/3] bg-gray-200">
                      <Image
                        src="/images/Hombre.jpg"
                        alt="Hombre"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2">HOMBRE</Button>
                    </div>
                  </Link>

                  <Link href="/ninas" className="relative group overflow-hidden rounded-lg block">
                    <div className="aspect-[4/3] bg-gray-200">
                      <Image
                        src="/images/Niñas.jpg"
                        alt="Niñas"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2">NIÑAS</Button>
                    </div>
                  </Link>
                </div>

                {/* Niños */}
                <Link href="/ninos" className="relative group overflow-hidden rounded-lg">
                  <div className="aspect-[4/5] bg-gray-200">
                    <Image
                      src="/images/Niños.jpg"
                      alt="Niños"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2">NIÑOS</Button>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* PRODUCTOS DESTACADOS */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">PRODUCTOS DESTACADOS</h2>
              <p className="text-gray-600">Looks increíbles</p>
            </div>

            {loading && featuredProducts.length === 0 ? (
              <p className="text-center text-gray-500">Cargando…</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <Link key={product.id} href={`/producto/${product.id}`} className="group">
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="relative">          
                        <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                          <Image
                            src={product.imagen_nombre_archivo || "/placeholder.svg"}
                            alt={product.nombre}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-2">{product.nombre}</h3>
                        <p className="text-lg font-bold text-gray-900 mb-3">{displayPrice(product.precio)}</p>
                        <div className="flex gap-1">
                          {product.color.map((color, idx) => (
                            <button
                              key={idx}
                              className={`w-4 h-4 rounded-full ${getColorClass(color)} hover:scale-110 transition-transform`}
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedColors({ ...selectedColors, [product.id]: color })
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

          {/* Best Sellers Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">LOS MÁS VENDIDOS</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {bestSellers.map((product) => (
                  <Link key={product.id} href={`/producto/${product.id}`} className="group">
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                        <Image
                          src={product.imagen_nombre_archivo || "/placeholder.svg"}
                          alt={product.nombre}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-2">{product.nombre}</h3>
                        <p className="text-lg font-bold text-gray-900 mb-3">{product.precio}</p>
                        <div className="flex gap-1">
                          {product.color.map((color, index) => (
                            <button
                              key={index}
                              className={`w-4 h-4 rounded-full ${getColorClass(color)} hover:scale-110 transition-transform`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Promotional Banner */}
              <div className="relative rounded-lg overflow-hidden">
                <div className="aspect-[3/1] bg-gradient-to-r from-orange-400 to-orange-600">
                  <Image
                    src="/images/General_home.jpg"
                    alt="Promoción zapatos negros"
                    width={900}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* News Section */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">NOTICIAS</h2>
                <p className="text-gray-600">Mantente actualizado con la moda y tips para tu salud</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {news.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-4 flex justify-center">
                      
                      <Image
                        src={article.logo || "/placeholder.svg"}
                        alt={`Logo ${article.author}`}
                        width={120}
                        height={80}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      By {article.author} - {article.date}
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">{article.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/noticias" className="text-blue-600 hover:underline">
                  Ver archivo de noticias
                </Link>
              </div>
            </div>
          </section>

          {/* Recommended Products Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">PRODUCTOS RECOMENDADOS</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <Link key={product.id} href={`/producto/${product.id}`} className="group">
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                        <Image
                          src={product.imagen_nombre_archivo || "/placeholder.svg"}
                          alt={product.nombre}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-2">{product.nombre}</h3>
                        <p className="text-lg font-bold text-gray-900 mb-3">{displayPrice(product.precio)}</p>
                        <div className="flex gap-1">
                          {product.color.map((color, index) => (
                            <button
                              key={index}
                              className={`w-4 h-4 rounded-full ${getColorClass(color)} hover:scale-110 transition-transform`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">SEGURO DE ENVÍO</h3>
                  <p className="text-sm text-gray-600">Recibimos un seguro de envío mediante devolución</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">ENTREGAS A NIVEL NACIONAL</h3>
                  <p className="text-sm text-gray-600">Hacemos tu pedido de 48 a 72 horas laborables</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">VENTAS POR TELÉFONO</h3>
                  <p className="text-sm text-gray-600">Horario de atención telefónica 09:00 a 18:00 horas</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">30 DÍAS DE CAMBIO</h3>
                  <p className="text-sm text-gray-600">El cambio o devolución podrás realizarlo en un plazo de 30 días</p>
                </div>
              </div>
            </div>
          </section>
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

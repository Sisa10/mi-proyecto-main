import { Search } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <>
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
            <Link href="/" className="text-gray-600 hover:text-gray-900">
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
    </>
  )
}

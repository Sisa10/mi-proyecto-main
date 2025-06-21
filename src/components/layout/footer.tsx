import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
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
  )
}

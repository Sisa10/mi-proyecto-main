'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    lastname: '',
    cedula: '',
    email: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombres: formData.username,
          apellidos: formData.lastname,
          cedula: formData.cedula,
          correo_electronico: formData.email,
          fecha_nacimiento: formData.birthdate,
          contraseña: formData.password,
        }),
      })
      if (response.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/login'), 2000)
      } else {
        const data = await response.json()
        setError(data.message || 'Error al registrar usuario')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error al conectar con el servidor')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Regístrate para comenzar a comprar
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              ¡Registro exitoso! Redirigiendo al inicio de sesión...
            </AlertDescription>
          </Alert>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
              Nombre de usuario
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Ingrese su nombre"
            />
          </div>
          <div>
            <Label htmlFor="lastname" className="text-sm font-medium text-gray-700">
              Nombre de usuario
            </Label>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Ingrese sus apellidos"
            />
          </div>
          <div>
            <Label htmlFor="cedula" className="text-sm font-medium text-gray-700">
              Nombre de usuario
            </Label>
            <Input
              id="cedula"
              name="cedula"
              type="text"
              value={formData.cedula}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Ingrese su cédula"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Ingrese su correo electrónico"
            />
          </div>
          <div>
            <Label htmlFor="birthdate" className="text-sm font-medium text-gray-700">
              Nombre de usuario
            </Label>
            <Input
              id="birthdate"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Ingrese su feha de nacimiento"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Confirme su contraseña"
            />
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
            Registrarse
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
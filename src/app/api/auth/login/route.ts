import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, isAdmin } = await request.json()

    // Simulación de validación (reemplaza con tu lógica real)
    if (isAdmin) {
      // Validación para administradores
      if (email.includes("admin") || email === "admin@main.com") {
        return NextResponse.json({
          success: true,
          token: "admin-jwt-token-here",
          user: {
            id: 1,
            email,
            role: "admin",
          },
        })
      }
    } else {
      // Validación para usuarios regulares
      if (email && password) {
        return NextResponse.json({
          success: true,
          token: "user-jwt-token-here",
          user: {
            id: 2,
            email,
            role: "user",
          },
        })
      }
    }

    return NextResponse.json({ success: false, message: "Credenciales inválidas" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error del servidor" }, { status: 500 })
  }
}

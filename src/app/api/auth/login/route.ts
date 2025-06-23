import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { correo_electronico, contraseña, isAdmin } = await request.json()

    // Simulación de validación (reemplaza con tu lógica real)
    if (isAdmin) {
      // Validación para administradores
      if (correo_electronico.includes("admin") || correo_electronico === "admin@main.com") {
        return NextResponse.json({
          success: true,
          token: "admin-jwt-token-here",
          user: {
            id: 1,
            correo_electronico,
            role: "admin",
          },
        })
      }
    } else {
      // Validación para usuarios regulares
      if (correo_electronico && contraseña) {
        return NextResponse.json({
          success: true,
          token: "user-jwt-token-here",
          user: {
            id: 2,
            correo_electronico,
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

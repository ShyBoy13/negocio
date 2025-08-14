import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const rutasProtegidas = ['/recibos', '/productos']
//const rutasPublicas = ['/', '/cobro', '/registro']

export default async function middleware(req:NextRequest) {
  const path = req.nextUrl.pathname
  const esRutaProtegida = rutasProtegidas.includes(path)
  //const esRutaPublica = rutasPublicas.includes(path)

  const cookie = ( await cookies()).get('credenciales')?.value
  const session = cookie ? JSON.parse(atob(cookie)) : null

  console.log('session', session)
  if (!session && esRutaProtegida) {
    console.log('No tienes permiso para acceder a esta ruta 1')
    return NextResponse.redirect(new URL('/registro', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
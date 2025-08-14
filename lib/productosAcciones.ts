'use server'
import {insertar, eliminar} from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function crearProductoServidor(producto:FormData) {
  const productoNuevo = {
    nombre: producto.get('nombre'),
    precio: producto.get('precio'),
  }
  await insertar('negocio', 'productos', productoNuevo)
  revalidatePath('/productos')
}

export async function eliminarProductoServidor(id: string) {
  if (!id && id === '') return
  await eliminar('negocio', 'productos', id)
  revalidatePath('/productos')
}

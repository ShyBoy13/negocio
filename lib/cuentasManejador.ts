'use server'

import { Productos } from '@/app/types'
import {insertar, eliminar, obtener} from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function crearCuentaServidor(cuenta: {productos: Productos, total: number, fecha: Date }) {
  //hacer que cuando se guarde una cuenta en productos solo guarde el id de cada producto y no el producto entero
  await insertar('negocio', 'cuentas', cuenta)
  revalidatePath('/recibos')
}

export async function obtenerCuentasServidor() {
  return await obtener('negocio', 'cuentas')
} 

export async function eliminarCuentaServidor(id: string) {
  if (!id && id === '') return
  await eliminar('negocio', 'cuentas', id)
  revalidatePath('/recibos')
}

  // Update data
  // Revalidate cache
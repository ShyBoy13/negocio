'use server'

import {insertar, eliminar, obtener} from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function crearCuentaServidor(cuenta: {productos: any[], total: number, fecha: Date }) {
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
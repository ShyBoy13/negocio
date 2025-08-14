'use server'

import db from '@/lib/db'
export async function crearCuentaServidor(cuenta: {productos: any[], total: number, fecha: Date }) {
  try {
    await db.connect()
    const basedatos = db.db('negocio')
    const cuentas = basedatos.collection('cuentas')
    const resultado = await cuentas.insertOne(cuenta)
    console.log('Cuenta creada:', resultado)
  } catch (error) {
    console.error('Error al crear la cuenta:', error)
  } finally {
    await db.close()
  }
}
 
export async function deletePost(formData: FormData) {
  const id = formData.get('id')
}


  // Update data
  // Revalidate cache
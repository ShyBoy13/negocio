import 'server-only'
import { cookies } from 'next/headers';
import { cache } from 'react';
import { redirect } from 'next/navigation';

export default async function autenticar(credencialesForm: FormData) {
  'use server'
  const nombre = credencialesForm.get('nombre')?.toString();
  const clave = credencialesForm.get('clave')?.toString();
  const cookiesStore = await cookies()
  let credenciales

  console.log('jamas se ejecuta esto')
  if ( nombre && clave)  {
    if (nombre === 'admin' && clave === 'R10S4SR3YK1R0') {
      credenciales = btoa(JSON.stringify({
        nombre,
        clave,
        permiso: 'admin'
      }))
    } else {
      credenciales = btoa(JSON.stringify({
        nombre,
        clave,
        permiso: 'usuario'
      }))
    }
    console.log('credenciales', credenciales)
    cookiesStore.set('credenciales', credenciales , {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    })
    redirect('/')
  }
}

export const verificar = cache(async () => {
  const cookie = (await cookies()).get('credenciales')?.value
  const session = cookie ? JSON.parse(atob(cookie)) : null
  console.log('verificar', session)
 
  if (!session) {
    return { isAuth: false, user: null}
  }
 
  return { isAuth: true, user: session }
})
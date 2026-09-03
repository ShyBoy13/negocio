"use server"
import { CuentaIF } from '@/app/ui/cobro';
import RecibosLista from '../ui/recibosLista';
import { obtenerCuentasServidor } from '@/lib/cuentasManejador';
 
export default async function Page() {
  const cuentasObj: CuentaIF[] = await obtenerCuentasServidor()
  // Para despues -> filtrar por fechas
  return (
    <RecibosLista cuentas={cuentasObj} />
  )
}

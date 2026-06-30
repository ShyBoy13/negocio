import {obtener} from '@/lib/db'
import CobroApp from '@/app/ui/cobro';
 
export default async function Page() {
  console.log('obteniendo productos')
  const productos = await obtener('negocio', 'productos')
  console.log('se obtenieron los productos')
  return (
    <CobroApp productos={productos} />
  )
}
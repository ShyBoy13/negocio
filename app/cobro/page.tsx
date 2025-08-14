import {obtener} from '@/lib/db'
import CobroApp from '@/app/ui/cobro';
 
export default async function Page() {
  const productos = await obtener('negocio', 'productos')
  return (
    <CobroApp productos={productos} />
  )
}
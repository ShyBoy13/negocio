import {obtener} from '@/lib/db'
import { crearProductoServidor, eliminarProductoServidor } from '@/lib/productosAcciones'
import ProductosGestion from '@/app/ui/productos-gestion'
import styles from './page.module.scss'
import clsx from 'clsx'

const CrearProducto = () => {
  const claseBase = 'productos-gestion__form-contenido'
  return (
    <form className={clsx(styles['form'], styles[claseBase])} action={crearProductoServidor}>
      <input className={clsx(styles[claseBase+'__input'], styles[claseBase+'__nombre'])} type="text" name="nombre" id="" placeholder='Nombre'/>
      <input className={clsx(styles[claseBase+'__input'], styles[claseBase+'__precio'])} type="number" name="precio" id="" placeholder='Precio'/>
      <input className={clsx(styles[claseBase+'__input'], styles[claseBase+'__aceptar'])} type="submit" value="Aceptar" />
    </form>
  )
}
 
export default async function ProductosApp() {
  const productos: any[] = await obtener('negocio', 'productos')
  const claseBase = 'productos-gestion'
  console.log('productos', productos)
  return (
    <main className={styles[claseBase]}>
      <CrearProducto />
      <ProductosGestion productos={productos}/>
    </main>
  )
}
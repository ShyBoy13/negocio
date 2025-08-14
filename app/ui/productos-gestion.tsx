'use client'
import styles from './productos-gestion.module.scss'
import clsx from 'clsx'
import { eliminarProductoServidor } from '@/lib/productosAcciones'
import ProductosLista from '@/app/ui/productosLista'

export default function GestionProductos({productos}: {productos: any[]}) {
  const eliminarProducto1 = (e: React.MouseEvent<HTMLElement>) => {
    let productoId = e.target instanceof HTMLButtonElement && e.target.parentElement?.id
    productoId && eliminarProductoServidor(productoId)
  }
  return (
    <section className={styles['gestion-contenido']}>
      <article className={styles['gestion-contenido__cabecera']}>
        <div className={clsx(styles['gestion-contenido__cabecera__nombre'])}>Nombre</div>
        <div className={clsx(styles['gestion-contenido__cabecera__precio'])}>Precio</div>
      </article>
      <ProductosLista productos={productos} tipoProductos='gestion' componenteAcciones={<button className={styles['boton']} onClick={eliminarProducto1}>X</button>}/>
    </section>
  )
}
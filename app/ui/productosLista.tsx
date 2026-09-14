'use client'
import type { Producto, ProductosProps, Productos} from '../types'
import styles from './productosLista.module.scss'
import clsx from 'clsx'


function Producto ({producto, props}: {producto: Producto, props: ProductosProps}) {
  let separador
  if (props.productoTipo === 'busqueda') {
    separador = <div className={styles['subrayado-completo']}></div>
  }
  return (
    <article onClick={props.productoClick} data-id={producto._id} data-tipo-producto={props.productoTipo} className={styles['producto']}>
      <div className={styles['nombre']}>{producto.nombre}</div>
      {separador}
      {props.productoTipo === 'cuenta' ? <div className={styles['cantidad']}>{producto.cantidad}</div> : producto.cantidad} 
      <div className={styles['precio']}>{props.productoTipo === 'cuenta' && producto.cantidad ? producto.cantidad*producto.precio: producto.precio}</div>
      { props.componenteAcciones ? <div id={producto._id} className={styles['acciones']}>{props.componenteAcciones}</div> : undefined }
    </article>
  )
}

export default function ProductosLista ({productos, props}: {productos: Productos, props: ProductosProps}) {
  // Cuando se utilice este componente se le tiene que poner un padre para poner espacios y colores del fondo.
  // Para modificar cosas generales de los productos se usa el atributo data-tipo-producto con el valor del tipo de producto [gestion, cuenta, buscar] de segun la propiedad productoTipo del componente
    // tambien se puede dejar vacio
  return (
    <section className={clsx(styles['productos-lista'], styles['productos-'+props.productoTipo])}>
        {productos.map((producto, i) => <Producto key={i} producto={producto} props={props} />)}
    </section>
  )
}
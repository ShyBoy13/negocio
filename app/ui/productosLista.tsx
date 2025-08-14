'use client'
import styles from './productosLista.module.scss'
import clsx from 'clsx'
import { ReactElement } from 'react'

export interface ProductoIF {
  _id?: string,
  cantidad?: number
  nombre: string,
  precio: number
}

function Producto ({producto, cantidad = undefined, productoTipo, componenteAcciones}: 
  {
    producto: ProductoIF,
    cantidad?: number,
    productoTipo?: string,
    componenteAcciones?: React.ReactElement 
  }
  ) {
    const claseBase = 'producto'
    console.log('tipo', claseBase+'-'+productoTipo)

    let claseProducto
    let claseCantidad
    let clasePrecio
    let claseNombre
    let claseAcciones

    if (productoTipo) {
      claseProducto = styles[claseBase+'-'+productoTipo]
      claseCantidad = styles[claseBase+'-'+productoTipo+'__cantidad']
      clasePrecio = styles[claseBase+'-'+productoTipo+'__precio']
      claseNombre = styles[claseBase+'-'+productoTipo+'__nombre']
      claseAcciones = styles[claseBase+'-'+productoTipo+'__acciones']
    }

    return (
      <article className={clsx(styles[claseBase], claseProducto, styles[claseBase+'--'+'seleccionado'])}>
        <div className={clsx(styles[claseBase+'-nombre'], claseNombre)}>{producto.nombre}</div>
        {typeof cantidad === 'number' ? <div className={clsx(claseCantidad)}>{cantidad}</div> : cantidad} 
        <div className={clsx(styles[claseBase+'-precio'], clasePrecio)}>{typeof cantidad === 'number' ? cantidad*producto.precio: producto.precio}</div>
        { componenteAcciones ? <div id={producto._id} className={clsx(claseAcciones)}>{componenteAcciones}</div> : undefined }
      </article>
    )
}

export default function ProductosLista ({productos, tipoProductos, componenteAcciones}: {
    productos: ProductoIF[],
    tipoProductos?: 'cuenta'|'gestion'|'buscar',
    componenteAcciones?: ReactElement
  }) {
  return (
    <section className={clsx(styles['productos-lista'], styles['productos-'+tipoProductos])}>
        {productos.map((producto, i) => <Producto key={i} producto={producto} cantidad={producto.cantidad} productoTipo={tipoProductos} componenteAcciones={componenteAcciones}/>)}
    </section>
  )
}
'use client'
import { ReactElement, use, useEffect, useState } from 'react'
import ProductosLista from '@/app/ui/productosLista'
import { crearCuentaServidor } from '@/lib/cuentasManejador'
import styles from './cobro.module.scss'

type ProdcutosARG = (string | number)[]
type ProductosListaTP = ProductoIF[]
type ProductosCuentaTP = ProductoCuentaIF[]

export interface ProductoIF {
  _id?: string,
  nombre: string,
  precio: number

}

interface ProductoCuentaIF extends ProductoIF {
  cantidad: number
}

export interface CuentaIF {
  productos: ProductosCuentaTP,
  _id?: string,
  total: number,
  fecha: Date,
}

const crearCuenta = (productos: ProductosListaTP): CuentaIF => {
  let productosCuenta: ProductosCuentaTP = productos.map(producto => Object.assign({cantidad: 0}, producto))

  return {
    productos: productosCuenta,
    total: 0,
    fecha: new Date()
  }
}

const crearProductoUnico = ([nombre, precio]: [string, number], productosLista: ProductosListaTP = []): ProductoIF  => {
  return {
    nombre: nombre,
    precio: precio,
  }
}

const crearProductos = (productos: ProdcutosARG) => {
  let productosConvertidos: ProductoIF[] = [] 
  for (let i=0; i<productos.length; i+=2) {
    let [nombre, precio] = [productos[i], productos[i+1]]
    if (typeof nombre === 'string' && typeof precio === 'number') {
      productosConvertidos.push(crearProductoUnico([nombre, precio], productosConvertidos))
    } else {
      console.log('argumentos invalidos')
      return [] 
    }
  }
  return productosConvertidos
}

const CuentaCliente = ({cuenta, mandarCuenta, eliminarProducto}: {cuenta: CuentaIF, mandarCuenta: () => void, eliminarProducto: (productoId: string) => void}) => {
  const aceptarCuenta = () => {
    if (confirm('La cuenta es correcta?')) mandarCuenta()
  }

  const quitarProducto = (e: React.MouseEvent<HTMLButtonElement>) => {
    let productoElem = e.target instanceof HTMLButtonElement && e.target.closest<HTMLElement>('#producto')
    if (productoElem && productoElem.dataset.id) {
      eliminarProducto(productoElem.dataset.id)
    } else {
      console.error('No se pudo encontrar el producto a eliminar')
    }
  }

  const calcularCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pago = parseFloat(e.target.value)
    if (isNaN(pago)) {
      pago = 0
    }
    let cambio = pago - cuenta.total
    if (cambio < 0) {
      cambio = 0
    }
    document.querySelector<HTMLOutputElement>('#cambio')!.textContent = cambio.toFixed(2)
    console.log(`Cambio: ${cambio}`)
  }

  useEffect(() => {
    let cuentaMontoElem = document.querySelector<HTMLInputElement>('#cuenta-monto')
    let cambioElem = document.querySelector<HTMLOutputElement>('#cambio')
    if (cuentaMontoElem && cambioElem ) {
      let cambio = parseInt(cuentaMontoElem.value)-cuenta.total
      if ( isNaN(cambio) ) {
        cambioElem.textContent = '0.00'
      } else {
        cambioElem.textContent = (parseInt(cuentaMontoElem.value)-cuenta.total).toFixed(2)
      }
    }
    console.log('Cuenta actualizada:', cuenta)
  }, [cuenta])

  return (
    <section className={styles['cuenta-productos-cont']}> 
      <div className={styles['cuenta-total']}>
        { cuenta.productos.length > 0 ? <span>Total: {cuenta.total}</span> : undefined}
      </div>
      <ProductosLista productos={cuenta.productos} tipoProductos='cuenta' componenteAcciones={<button onClick={quitarProducto} id="producto-quitar-btn" className={styles['producto-quitar-btn']}>—</button>} />
      <div className={styles['cuenta-cambio-contenido']}>
        <label htmlFor="cuenta-monto">
          Monto: 
          <input onChange={calcularCambio} className={styles['cuenta-pago']} type="number" name="" id="cuenta-monto" />
        </label>
        <span>Cambio: </span>
        <output id='cambio'></output>
      </div>
      { cuenta.productos.length > 0 ? <button className={styles['cuenta-aceptar']} onClick={aceptarCuenta}>Aceptar</button> : undefined}
    </section>
  )
}

export const BuscarProductos = ({productos, actualizarCuentaProductos}: {productos: ProductoIF[], actualizarCuentaProductos: (productoId: string) => void}) => {
  const [productosLista, ponerProductos] = useState(productos)

  const buscarProducto = (e: React.ChangeEvent<HTMLInputElement>) => {
    ponerProductos(productos.filter(producto => producto.nombre.toLowerCase().includes(e.target.value)))
  }

  const ponerCuentaProductos = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement) {
      let producto = e.target.closest<HTMLElement>('[data-id]')
      if ( producto && producto.dataset.id) {
        actualizarCuentaProductos(producto.dataset.id)
      }
    }
  }

  return (
    <section className={styles['buscar-productos-cont']}>
      <div className={styles['buscar-producto-form']}>
        <input onChange={buscarProducto} className={styles['buscar-producto-texto']} type="text" placeholder='Buscar producto'/>
      </div>
      <ProductosLista productos={productos} tipoProductos='buscar'/>
    </section>
  )
}

export default function CobroApp ({productos}: {productos: ProductoIF[]}) {
  const productosLista = productos
  const cuentaVacia = {productos: [], fecha: new Date(), total: 0}
  const [cuentaProductos, ponerCuentaProductos] = useState<CuentaIF>(cuentaVacia)

  const agregarProducto = (productoId: string) => {
    let cuentaProductosObj = Object.assign({}, cuentaProductos)
    let producto = productosLista.find(producto => producto._id === productoId)
    let productoRepetido = cuentaProductosObj.productos.find(productoObj => productoObj._id == producto?._id)
    if (productoRepetido) {
      productoRepetido.cantidad+=1
    } else {
      cuentaProductosObj.productos.push(Object.assign({cantidad: 1}, producto))
    }
    cuentaProductosObj.total = cuentaProductosObj.productos.reduce((total, producto) =>  total + producto.precio * producto.cantidad, 0)
    ponerCuentaProductos(cuentaProductosObj)
  }

  const quitarProducto = (productoId: string) => {
    let cuentaProductosObj = Object.assign({}, cuentaProductos)
    cuentaProductosObj.productos = cuentaProductos.productos.filter((producto) => producto._id !== productoId)
    cuentaProductosObj.total = cuentaProductosObj.productos.reduce((total, producto) =>  total + producto.precio * producto.cantidad, 0)
    ponerCuentaProductos(cuentaProductosObj)
  }

  const terminarCuenta = () => {
    let cuenta = Object.assign({}, cuentaProductos)
    cuenta.fecha = new Date()
    crearCuentaServidor(cuentaProductos)
    ponerCuentaProductos(cuentaVacia)
  }

  useEffect(() => {
    console.log('Cuenta actualizada:', cuentaProductos)
  }, [cuentaProductos])

  return (
    <main className={styles['cobro-app']}>
      <BuscarProductos productos={productosLista} actualizarCuentaProductos={agregarProducto} />
      <CuentaCliente cuenta={cuentaProductos} mandarCuenta={terminarCuenta} eliminarProducto={quitarProducto}/>
    </main>
  )
}
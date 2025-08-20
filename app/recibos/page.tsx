import {obtener} from '@/lib/db'
import { CuentaIF } from '@/app/ui/cobro';
import styles from './page.module.scss'
import clsx from 'clsx'
 
export default async function Page() {
  const claseBase = 'recibos-lista'
  const cuentas = await obtener('negocio', 'cuentas')
  // Para despues -> filtrar por fechas
  return (
    <article className={clsx(styles[claseBase])}>
      <div className={clsx(styles['total-ventas'])}>
        <p>Total ventas: <span className={clsx(styles['total-ventas__cantidad'])}>{cuentas.reduce((totalVendido: number, cuenta: CuentaIF) => {return totalVendido + cuenta.total}, 0)}</span></p>
      </div>
      {
        cuentas.map((cuenta: CuentaIF) => {
          return (
            <div className={clsx(styles[claseBase+'__recibo'])} key={cuenta._id}>
              <div className={clsx(styles[claseBase+'__recibo__informacion'])}>
                <span className={clsx(styles[claseBase+'__recibo__informacion__fecha'])}>Fecha: {cuenta.fecha.toLocaleString()}</span>
                <span className={clsx(styles[claseBase+'__recibo__informacion__total'])}>Total: {cuenta.total}</span>
              </div>
              <div className={clsx(styles[claseBase+'__recibo__productos'])}>
                <div className={clsx(styles[claseBase+'__recibo__productos__cabecera'])}>
                  <span className={clsx(styles[claseBase+'__recibo__productos__cabecera__nombre'])}>Producto</span>
                  <span className={clsx(styles[claseBase+'__recibo__productos__cabecera__precio'])}>Precio</span>
                  <span className={clsx(styles[claseBase+'__recibo__productos__cabecera__cantidad'])}>C.</span>
                </div>
                {cuenta.productos.map(producto => 
                  <div className={clsx(styles[claseBase+'__recibo__productos__producto'])} key={producto._id}>
                    <span className={clsx(styles[claseBase+'__recibo__productos__producto__nombre'])}><i>{producto.nombre.slice(0, producto.nombre.indexOf(','))}</i>{producto.nombre.slice(producto.nombre.indexOf(','))}</span>
                    <span className={clsx(styles[claseBase+'__recibo__productos__producto__precio'])}>{producto.precio}</span>
                    <span className={clsx(styles[claseBase+'__recibo__productos__producto__cantidad'])}>{producto.cantidad}</span>
                  </div>)
                }</div>
            </div>
          )
        })
      }
    </article>
  )
}

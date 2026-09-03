'use client'
import { CuentaIF } from '@/app/ui/cobro';
import styles from './recibosLista.module.scss'
import clsx from 'clsx';
import React from 'react';
import { eliminarCuentaServidor } from '@/lib/cuentasManejador';

export default function RecibosLista({cuentas}: {cuentas: CuentaIF[]}) {
  const borrarRecibo = (e: React.PointerEvent<HTMLElement>) => {
    if (e.currentTarget.dataset.id) {
      eliminarCuentaServidor(e.currentTarget.dataset.id)
    }
  }
  return (
    <div className="recibos-cont">
      <div className={clsx(styles['total-ventas'])}>
        <p>Total ventas: <span className={clsx(styles['total-ventas__cantidad'])}>{cuentas.reduce((totalVendido: number, cuenta: CuentaIF) => {return totalVendido + cuenta.total}, 0)}</span></p>
      </div>
      <section className={styles["recibos-lista"]}>
        {
          cuentas.map((cuenta: CuentaIF) => {
            return (
              <article className={styles["recibo"]} key={cuenta._id}>
                <div className={styles["informacion"]}>
                  <span className={styles["fecha"]}>Fecha: {cuenta.fecha.toLocaleString()}</span>
                  <span className={styles["total"]}>Total: {cuenta.total}</span>
                  <span onClick={borrarRecibo} data-id={cuenta._id} className={styles['borrar']}>X</span>
                </div>
                <div className={styles["productos"]}>
                  <div className={styles["cabecera"]}>
                    <span className={styles["nombre"]}>Productos</span>
                    <span className={styles["precio"]}>Precio</span>
                    <span className={styles["cantidad"]}>C.</span>
                  </div>
                  {cuenta.productos.map(producto => 
                    <div className={styles["producto"]} key={producto._id}>
                      <span className={styles["nombre"]}><i>{producto.nombre.slice(0, producto.nombre.indexOf(','))}</i>{producto.nombre.slice(producto.nombre.indexOf(','))}</span>
                      <span className={styles["precio"]}>{producto.precio}</span>
                      <span className={styles["cantidad"]}>{producto.cantidad}</span>
                    </div>)
                  }</div>
              </article>
            )
          })
        }
      </section>
    </div>
  )
}
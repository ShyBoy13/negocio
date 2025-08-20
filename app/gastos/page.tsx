'use client'
import React, { useEffect, useRef, useState } from "react"
import styles from './page.module.scss'

interface PrimaI {
  nombre: string,
  precio: number,
  cantidad?: [number, string],
}

interface GastoI {
  id?: string,
  nombre: string,
  readonly gasto: number,
  materiasPrimas: PrimaI[],
}

const crearGasto = (nombre: string, ingredientes: PrimaI[]) => {
  return {
    nombre,
    materiasPrimas: ingredientes,
    get gasto():number {
      return this.materiasPrimas.reduce((gasto, prima) => gasto + prima.precio, 0)
    },
  }

}

const INGREDIENTES: PrimaI[] = [
  {nombre: 'harina', cantidad: [500, 'gr'], precio: 12},
  {nombre: 'manteca vegetal', cantidad: [125, 'gr'], precio: 8},
  {nombre: 'harina', cantidad: [250, 'ml'], precio: 0.25},
]

const GASTO: GastoI = {
  id: '1',
  nombre: 'tortillas',
  materiasPrimas: INGREDIENTES,
  get gasto():number {
    return this.materiasPrimas.reduce((gasto, prima) => gasto + prima.precio, 0)
  },
}

const Ingrediente = ({prima}: {prima: PrimaI}) => {
  return (
    <div>
      {prima.nombre} - ${prima.precio} ({prima.cantidad ? `${prima.cantidad[0]} ${prima.cantidad[1]}` : 'N/A'})
    </div>
  )
}

const Gasto = ({gasto}: {gasto: GastoI}) => {
  return (
    <article data-id={gasto.id}>
      <div>{gasto.nombre} {gasto.gasto}</div>
      {gasto.materiasPrimas?.map((prima, i) => <div key={i}>{prima.nombre}{prima.precio}</div>)}
    </article>
  )
}



const GastoFormulario = ({agregarGasto}: {agregarGasto: (gasto: GastoI) => void}) => {
  const gastoFormularioRef = useRef<HTMLFormElement>(null)
  const [ingredientes, ponerIngredientes] = useState<PrimaI[]>([])

  const nuevoGasto = (e: React.PointerEvent<HTMLFormElement>) => {
    // aqui funcionalidad para agregar un nuevo producto final 
    console.log('Click boton formulario')
    let gastoFormulario = gastoFormularioRef.current as HTMLFormElement
    if (e.target instanceof HTMLInputElement && gastoFormulario ) {
      let elementosGastoFormulario = gastoFormulario.elements
      console.log(gastoFormulario.checkValidity())
      if (e.target.id === 'boton-agregar-ingrediente' && gastoFormulario.checkValidity()) {
        console.log('Nuevo ingrediente')
        let nombre = elementosGastoFormulario.namedItem('nombre-ingrediente') as HTMLInputElement
        let precio =  elementosGastoFormulario.namedItem('precio') as HTMLInputElement
        let cantidad =  elementosGastoFormulario.namedItem('cantidad') as HTMLInputElement
        let medida =  elementosGastoFormulario.namedItem('medida') as HTMLInputElement
        console.log(precio.value)
        let entradas = [nombre, precio, cantidad, medida]

        ponerIngredientes(ingredientes.concat({
          nombre: nombre.value,
          precio: parseFloat(precio.value),
          cantidad: [parseFloat(cantidad.value), medida.value]
        }))
        entradas.forEach(entrada => {
          entrada.value = entrada.defaultValue
        })
      } else if (e.target.id === 'boton-agregar-gasto') {
          let nombre = elementosGastoFormulario.namedItem('nombre-producto-final') as HTMLInputElement
          agregarGasto(crearGasto(nombre.value, ingredientes))
          ponerIngredientes([])
          gastoFormulario.reset()
      }
    }
  }

  useEffect(() => {
    console.log('Ingredientes', ingredientes)
  }, [ingredientes])
  // Para despues -> agregar (o cambiar) que se puedan ver los gastos y los ingresos
  return (
    <form onClick={nuevoGasto} ref={gastoFormularioRef}>
      <input required type="text" name="nombre-producto-final" placeholder="Producto final"/>
      <input id="boton-agregar-gasto" type="button" value="Aceptar"/>
      <fieldset>
        <legend>Ingredientes</legend>
        <input required type="text" name="nombre-ingrediente" placeholder="Nombre"/>
        <input required type="number" name="precio" min='0' step='0.01' placeholder="Precio" defaultValue={0}/>
        <input required type="number" name="cantidad" placeholder="Cantidad"/>
        <input required type="text" name="medida" placeholder="Medida"/>
        <input id="boton-agregar-ingrediente" type="button" value="Agregar"/>
      </fieldset>
      <output className={styles['ingredientes-formulario']}>{ingredientes.map((ingrediente, i) => <Ingrediente key={i} prima={ingrediente}/>)}</output>
    </form>
  )
}

export default function GastosApp () {
  let [gastos, ponerGastos] = useState<GastoI[]>([])

  const agregarGasto = (gasto: GastoI) => {
    ponerGastos(gastos.concat(gasto))
  }

  return (
    <section>
      <GastoFormulario agregarGasto={agregarGasto}/>
      <div>
        {gastos.map((gasto, i) => <Gasto key={i} gasto={gasto}/>)}
      </div>
    </section>
  )
}
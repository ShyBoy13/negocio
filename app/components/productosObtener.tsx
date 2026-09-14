'use server'
import ProductosLista from "../ui/productosLista"
import type { ProductosProps } from "../types"
import { obtenerProductosServidor } from "@/lib/productosAcciones"

export default async function ObtenerProductos (props: ProductosProps) {
  const productos = await obtenerProductosServidor()
  return (
    <ProductosLista productos={productos} props={props}/> 
  )
}
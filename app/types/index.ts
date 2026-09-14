import { ReactElement } from "react";

export type Productos = Producto[]

export interface Producto {
  _id?: string,
  cantidad: number
  nombre: string,
  precio: number
}

export interface ProductosProps {
    productoTipo?: 'cuenta'|'gestion'|'busqueda',
    productoClick?: (e: React.PointerEvent<HTMLDivElement>) => void,
    componenteAcciones?: ReactElement,
}
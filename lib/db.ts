import { ObjectId } from "mongodb"

const { MongoClient } = require("mongodb")
const uri = "mongodb://localhost:27017"

const cliente = new MongoClient(uri)

export async function insertar (basedatos: string, coleccion: string, documento: any) {
  try {
    await cliente.connect()
    const bd = cliente.db(basedatos)
    const col = bd.collection(coleccion)
    const resultado = await col.insertOne(documento)
    console.log(`Documento insertado con el ID: ${resultado.insertedId}`)
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
  } finally {
    await cliente.close()
  } 
}

export async function obtener (basedatos: string, coleccion: string, filtro: any = {}) {
  try {
    await cliente.connect();
    const bd = cliente.db(basedatos);
    const col = bd.collection(coleccion)
    const productosCursor = await col.find();
    let productos = await productosCursor.toArray()
    productos = productos.map(producto => {
      producto._id = producto._id.toString();
      return producto
    })
    return productos;
  } catch (error) {
    return []
  } finally {
    await cliente.close()
  }
}

export async function eliminar (basedatos: string, coleccion: string, id: string | undefined) {
  try {
    await cliente.connect();
    const bd = cliente.db(basedatos);
    const col = bd.collection(coleccion)
    console.log('eliminar', id)
    const productoEliminado = await col.deleteOne({_id: new ObjectId(id)});
    if (productoEliminado.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    } 
  } catch (error) {
    return []
  } finally {
    await cliente.close()
  }
}

export default cliente 


import auth from '@/actions/auth'

export default function Ingresar() {
  return (
    <form action={auth}>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" placeholder="Nombre" />
      </div>
      <div>
        <label htmlFor="clave">Contraseña</label>
        <input id="clave" name="clave" type="password" placeholder='Contraseña' />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}


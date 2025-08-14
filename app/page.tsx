import styles from "./page.module.scss";
import Link from "next/link";
import {verificar} from '@/actions/auth'

export default async function Home() {
  const session = await verificar(); 
  if ( session.isAuth && session.user.permiso === 'admin') {
    return (
      <main>
        <div className={styles.links}>
          <Link href="/cobro">Cobro</Link>
          <Link href="/recibos">Recibos</Link>
          <Link href="/productos">Productos</Link>
        </div>
      </main>
    )
  } else {
    return (
      <main>
        <div className={styles.links}>
          <Link href="/cobro">Cobro</Link>
        </div>
      </main>
    )
  }
}



import styles from './header.module.scss'

import Link from 'next/link' 

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href='/'>
        <a>
          <img src='/images/logo.svg' alt="logo" />
        </a>
      </Link>
    </div>
  )
}

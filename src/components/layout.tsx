import Head from 'next/head'
import Nav from './nav'

import styles from './layout.module.scss'


export default function Layout({
  children,
}) {
  return (
    <div>
      <Head>
      </Head>
      <header>
        <Nav
          branding='Yevgeny Bulochnik'
          config={[
            {to: '/', name: 'Home', icon: 'home'},
            {to: '/about', name: 'About', icon: 'person'},
            {to: '/posts/programming', name: 'Programming', icon: 'applications'}
          ]}
        />
      </header>
      <div className={styles['content-spacer']}>
        {children}
      </div>
      <footer>{'Some footer'}</footer>
    </div>
  )
}

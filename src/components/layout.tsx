import Head from 'next/head'
import Nav from './nav'

import { Button } from '@blueprintjs/core'

import styles from './layout.module.scss'


export default function Layout({
  children,
}) {
  return (
    <div className={styles.container}>
      <Head>
      </Head>
      <Nav
        branding='Yevgeny Bulochnik'
        config={[
          {to: '/', name: 'Home', icon: 'home'},
          {to: '/about', name: 'About', icon: 'person'},
          {to: '/posts/programming', name: 'Programming', icon: 'applications'}
        ]}
      />
      <div className={styles.content}>
        {children}
      </div>
      <footer>
        <div className={styles.footerTray}>
          <Button minimal>
            <a href="https://github.com/yevgenybulochnik">Github</a>
          </Button>
          <Button minimal>
            <a href="https://linkedin.com/in/yevgeny-eugene-bulochnik-b429a6155">
              LinkedIn
            </a>
          </Button>
          <Button minimal>
            <a href="/contact">Contact</a>
          </Button>
        </div>
      </footer>
    </div>
  )
}

import '../styles/globals.scss'
import '@blueprintjs/core/lib/css/blueprint.css'
import { FocusStyleManager } from '@blueprintjs/core'
import Layout from 'src/components/layout'

FocusStyleManager.onlyShowFocusOnTabs()

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

import { getAllSlugs, getPost } from 'src/lib/api'
import Head from 'next/head'
import { markdownToHtml } from 'src/lib/markdownToHtml'

import styles from './posts.module.scss'

function Post(post) {
  return (
    <div>
      <Head>
        <title>will this title work</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-solarizedlight.min.css" />
      </Head>
      <div className={styles.post} dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = getPost(params.slug)

  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      data: post.data,
      content: content
    }
  }
}

export async function getStaticPaths() {
  const slugs = getAllSlugs()
  return {
    paths: slugs.map((slug) => `/posts/${slug}`),
    fallback: false,
  }
}

export default Post

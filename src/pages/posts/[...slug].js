import { getAllSlugs, getPost } from 'src/lib/api'
import { markdownToHtml } from 'src/lib/markdownToHtml'

function Post(post) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: post.content}} />
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

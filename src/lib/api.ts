import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type PostMeta = {
  title: string;
  type: string;
  topic: string;
  slug: string;
  desc: string;
  published: string;
  updated: string;
  tags: string[];
}

type Post = {
  file_name: string;
  file_path: string;
  data: PostMeta;
}

type ContentObj = {
  [key: string]: {
    projects: Post[],
    articles: Post[],
  }
}

const contentDir = path.join(process.cwd(), 'content')

export function walk(dir) {
  let results = []
  let list = fs.readdirSync(dir)

  list.forEach((file) => {
    file = path.resolve(path.join(dir, file))
    let stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file))
    } else {
      results.push(file)
    }
  })
  return results
}

export function genContentObj(dir=contentDir): ContentObj {
  const file_paths = walk(dir)

  const contentPieces = file_paths.map((file_path) => {
    const split = file_path.split(path.sep)
    const file_name = path.basename(file_path)
    const isArticle = ( split[split.length - 2] === 'articles' ) ? 0 : 1
    const topic = split[split.length -3]

    return {
      file_path,
      file_name,
      topic,
      type: isArticle ? 'project' : 'article'
    }
  })

  const topics = contentPieces.reduce((acc, cur) => {
    const { file_name, file_path } = cur

    const file = fs.readFileSync(file_path, 'utf-8')
    const { data } = matter(file)

    if (!data.published) {
      return acc
    }

    acc[cur.topic] = acc[cur.topic] || {projects: [], articles: []}
    if (cur.type === 'article') {
      acc[cur.topic]['articles'].push({file_name, file_path, data})
    } else {
      acc[cur.topic]['projects'].push({file_name, file_path, data})
    }
    return acc
  }, {})

  return topics
}


function getAllPosts() {
  const posts = walk(contentDir)
  return posts
}

export function getAllSlugs() {
  const posts = getAllPosts()
  const slugPaths = []

  posts.forEach((post) => {
    const fileContents = fs.readFileSync(post, 'utf-8')
    const { data } = matter(fileContents)
    slugPaths.push(path.join(data.topic, data.type, data.slug))
  })

  return slugPaths
}

export function getPost(slugPaths) {
  const posts = getAllPosts()
  let filteredPost = []

  posts.forEach((post) => {
    const fileContents = fs.readFileSync(post, 'utf-8')
    const { data, content } = matter(fileContents)

    if (data.slug === slugPaths[2]) {
      filteredPost.push({ data, content })
    }
  })

  return filteredPost[0]
}

function parsePost(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContents)

  return {
    data,
    content
  }
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

function walk(dir) {
  let results = []
  let list = fs.readdirSync(dir)

  list.forEach((file) => {
    file = path.join(dir, file)
    let stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file))
    } else {
      results.push(file)
    }
  })
  return results
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

import Layout from 'src/components/layout'
import WorksList from 'src/components/workslist'
import { genContentObj } from 'src/lib/api'


function ProgrammingSummary(props) {
  const adjArticles = props.topic.articles.map((article) => {
    return { ...article.data }
  })
  const adjProjects = props.topic.projects.map((project) => {
    return { ...project.data }
  })
  return (
    <div>
      <WorksList
        title='Articles'
        works={adjArticles}
        rootPath='/posts/programming/article'
      />
      <WorksList
        title='Projects'
        works={adjProjects}
        rootPath='/posts/programming/projects'
      />
    </div>
  )
}

export async function getStaticProps() {
  const content = genContentObj()
  return {
    props: {
      topic: content.programming
    }
  }
}

export default ProgrammingSummary

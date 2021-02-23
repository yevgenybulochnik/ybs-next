import Layout from 'src/components/layout'
import WorksList from 'src/components/workslist'
import { genContentObj } from 'src/lib/api'


function ProgrammingSummary({topic}) {
  return (
    <div>
      <WorksList
        title='Articles'
        works={topic.articles}
        rootPath='/posts/programming/article'
      />
      <WorksList
        title='Projects'
        works={topic.projects}
        rootPath='/posts/programming/project'
      />
    </div>
  )
}

export async function getStaticProps() {
  const { programming }= genContentObj()
  return {
    props: {
      topic: {
        articles: programming.articles.map((article) => {return {...article.data}}),
        projects: programming.projects.map((project) => {return {...project.data}}),
      }
    }
  }
}

export default ProgrammingSummary

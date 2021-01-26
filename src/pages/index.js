import Head from 'next/head'
import WorksList from 'src/components/workslist'
import Headshot from 'src/components/headshot'
import styles from 'src/pages/index.module.scss'

export default function Home() {
  return (
     <div className={styles.home}>
      <div className={styles.intro}>
        <h2>
          Hi! Welcome to my site. I am <em>Passionate</em> about healthcare and technology. A <em>Pharmacist</em> by trade with the knowledge of a <br/> <em>FullStack Developer</em>.
        </h2>
      </div>
      <div className={styles.sidebar}>
        <Headshot
          name='Yevgeny (Eugene) Bulochnik'
          credentials='PharmD 340B ACE CACP'
          src='https://assets.yevgenybulochnik.com/headshot.jpeg'
          height='300px'
        />
      </div>
      <div className={styles.introParagraph}>
        <p>
          It is exciting and empowering to be a clinician with patient care experience, while also having programming knowledge.
        </p>
        <p>
          Can you think of the last time you spoke to a local pharmacist or primary care doctor about <a href='https://kubernetes.io/'>Kubernetes</a> or the newest javascript framework to pop up? Whether its <a href='https://reactjs.org/'>React</a> for frontend development, <a href='https://www.ansible.com/'>Ansible</a> for devops or data manipulation with python <a href='https://pandas.pydata.org/'>Pandas</a>, I am engaged!
        </p>
        <p>
          I believe having clinicians who understand the development cycle, who understand how developers approach problems and can actively contribute to a codebase are extremely valuable.
        </p>
      </div>
      <div className={styles.homeContent}>
        <h2>Recent Work</h2>
        <WorksList title="Projects" works={[]} rootPath='/programming/projects'/>
        <WorksList title="Articles" works={[]} rootPath='/programming/articles'/>
      </div>
    </div>
  )
}

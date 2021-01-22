import React from 'react'
import { Card, Tag } from '@blueprintjs/core'
import { useRouter } from 'next/router'
import styles from './workslist.module.scss'

interface Props {
  title: string;
  works: any[];
  rootPath: string;
}

const WorksList: React.FC<Props> = (props) => {
  const {
   title,
   works,
   rootPath,
  } = props

  const router = useRouter()

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      {!works.length &&
          <div className={styles.placeholder}>
            <h5>Comming Soon!</h5>
          </div>
      }
      {works.map((work, i) => (
        <Card
          className={styles.workCard}
          key={i}
          interactive onClick={() => router.push(`${rootPath}/${work.slug}`)}
        >
          <div className={styles.cardContent}>
            { work.img &&
              <div className={styles.cardImage}>
                <img src={work.img} alt="" />
              </div>
            }
            <div className={styles.cardText}>
              {work.title &&
                <h4>{work.title}</h4>
              }
              <p>
                {work.desc}
              </p>
              {work.tags &&
                work.tags.map((tag: string, i: number) => (
                  <Tag key={i} minimal intent='primary' className={styles.tag}>{tag}</Tag>
                ))
              }
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default WorksList

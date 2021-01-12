import React from 'react'
import { Card, Tag } from '@blueprintjs/core'
import { navigate } from '@reach/router'
import './workslist.scss'

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

  return (
    <div className='workslist'>
      <h3>{title}</h3>
      {!works.length &&
          <div className='placeholder'>
            <h5>Comming Soon!</h5>
          </div>
      }
      {works.map((work, i) => (
        <Card
          className='work-card'
          key={i}
          interactive onClick={() => navigate(`${rootPath}/${work.slug}`)}
        >
          <div className='card-content'>
            { work.img &&
              <div className='card-image'>
                <img src={work.img} alt="" />
              </div>
            }
            <div className='card-text'>
              {work.title &&
                <h4>{work.title}</h4>
              }
              <p>
                {work.desc}
              </p>
              {work.tags &&
                work.tags.map((tag: string, i: number) => (
                  <Tag key={i} minimal intent='primary' className='tag'>{tag}</Tag>
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

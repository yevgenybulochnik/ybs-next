import React from 'react'
import styles from './headshot.module.scss'

interface Props {
  height: string;
  src: string;
  name: string;
  credentials: string;
}

const Headshot: React.FC<Props> = (props) => {
  const {
    height,
    src,
    name,
    credentials,
  } = props

  return (
    <div className={styles.headShot}>
      <img
        height={height}
        src={src}
        alt=""
        style={{borderRadius: '50%'}}
      />
      <div className={styles.creds}>
        <h4 className={styles.name}>
          {name}
        </h4>
        <h5 className={styles.credentials}>
          {credentials}
        </h5>
      </div>
    </div>
  )
}

export default Headshot

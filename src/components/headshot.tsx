import React from 'react'
import './headshot.scss'

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
    <div className='head-shot'>
      <img
        height={height}
        src={src}
        alt=""
        style={{borderRadius: '50%'}}
      />
      <div className="creds">
        <h4 className="name">
          {name}
        </h4>
        <h5 className="credentials">
          {credentials}
        </h5>
      </div>
    </div>
  )
}

export default Headshot

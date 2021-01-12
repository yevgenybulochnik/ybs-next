import React from 'react'
import {
  Navbar,
  Button,
  IconName,
  Menu,
  MenuItem,
  Popover,
} from '@blueprintjs/core'
import Link from 'next/link'
import styles from './nav.module.scss'

const { Heading, Divider, Group } = Navbar

type LinkConfig = {
  to: string;
  name: string;
  icon?: IconName;
}

interface Props {
  branding: string;
  config: LinkConfig[];
}

const Nav: React.FC<Props> = (props) => {
  const {
    branding,
    config,
  } = props

  return (
    <Navbar className={styles.nav} fixedToTop>
      <Group>
        <Heading><strong>{branding}</strong></Heading>
        <Divider/>
      </Group>
      <Group className={styles.desktop}>
        {config.map((link, i) =>
          <Link key={i} href={link.to}>
            <Button className='bp3-minimal' icon={link.icon}>{link.name}</Button>
          </Link>
        )}
      </Group>
      <Group align='right'>
        <Popover
          position='bottom'
          content={
            <Menu>
              {config.map((link, i) =>
                <MenuItem key={i} text={link.name} icon={link.icon} href={link.to}/>
              )}
            </Menu>
          }
        >
          <Button className={styles['mobile-button']}>Menu</Button>
        </Popover>
      </Group>
    </Navbar>
  )
}

export default Nav

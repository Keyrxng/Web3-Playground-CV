import React, { useState } from 'react'
import Style from './Navbar.module.scss'
import Toggler from '../home/Toggler'
import { Link, useRouter } from 'next/router'
import { Box } from '@mui/material'
import Klogo from '../../img/Klogo.png'

const links = [
  {
    name: 'Home',
    to: '/',
    active: 'home',
  },
  {
    name: 'Playground',
    to: '/playground',
    active: 'playground',
  },

  {
    image: Klogo,
    to: '/',
    active: 'home',
  },
  {
    name: 'Portfolio',
    to: '/portfolio',
    active: 'portfolio',
  },
  {
    name: 'About Me',
    to: '/about',
    active: 'about',
  },
]

export default function Navbar({ darkMode, handleClick }) {
  const router = useRouter()
  const [active, setActive] = useState(
    router.asPath === '/'
      ? 'home'
      : router.asPath.slice(1, router.asPath.length),
  )
  // const activez = {
  //   marginRight: 10,
  //   color: router.asPath === href ? 'red' : 'black',
  // }

  const clickS = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Box component={'nav'} width={'100%'}>
      <Box
        component={'ul'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={{ xs: '2rem', md: '8rem' }}
        textTransform={'lowercase'}
        fontSize={'1rem'}
      >
        {links.map((link, index) => (
          <li
            key={index}
            className={`${
              link.active === active && !link.image && Style.active
            }`}
          >
            {link.name && (
              <p key={index} style={{ paddingBottom: '0.5rem' }}>
                {link.name}
              </p>
            )}
            {link.image && (
              <img
                key={index}
                alt={'@Keyrxng Icon'}
                src={link.image}
                style={{ maxWidth: '75px' }}
              />
            )}
          </li>
        ))}
        <Toggler darkMode={darkMode} handleClick={handleClick} />
      </Box>
    </Box>
  )
}

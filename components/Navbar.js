import React, { useState } from 'react'
import Style from './styles/Navbar.module.scss'
import Toggler from './home/Toggler'
import { Link, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import Klogo from '../img/Klogo.png'

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
  const location = useLocation()
  const [active, setActive] = useState(
    location.pathname === '/'
      ? 'home'
      : location.pathname.slice(1, location.pathname.length),
  )

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
          <Link key={index} to={link.to} onClick={() => setActive(link.active)}>
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
          </Link>
        ))}
        <Toggler darkMode={darkMode} handleClick={handleClick} />
      </Box>
    </Box>
  )
}

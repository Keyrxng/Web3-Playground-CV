import React, { useState } from 'react'
import Style from './BaseLayout.module.scss'
import Navbar from './Navbar'
import Home from '../home/Home'
import About from '../about/About'
import Portfolio from '../portfolio/Portfolio'
import { Link, Routes } from 'next/link'
import { Box, fabClasses, Grid } from '@mui/material'
import BottomNav from './BottomNav'
import Playground from '../playgroung/Playground'

export default function BaseLayout(props) {
  let [darkMode, setDarkMode] = useState(false)

  function handleClick() {
    setDarkMode(!darkMode)
  }

  return (
    <div>
      <Box className={darkMode ? Style.dark : Style.light}>
        <Grid
          container
          display={'flex'}
          flexDirection={'column'}
          minHeight={'100vh'}
          justifyContent={'space-between'}
        >
          <Grid item>
            <Navbar darkMode={darkMode} handleClick={handleClick} />
            <BottomNav darkMode={darkMode} />
            <main className={Style}>{props.children}</main>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

import React from 'react'
import Style from './Home.module.scss'
import me from '../../img/bck.png'
import classNames from 'classnames'
import EmojiBullet from './EmojiBullet'
import { Box, Button } from '@mui/material'
import { info } from '../../info/Info'
import { ConnectButton } from '@web3uikit/web3'
import Image from 'next/image'

export default function Home() {
  return (
    <Box
      component={'main'}
      display={'flex'}
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems={'center'}
      justifyContent={'center'}
      minHeight={'calc(100vh - 175px)'}
    >
      <Box
        className={classNames(Style.avatar, Style.shadowed)}
        style={{ background: info.gradient }}
        component={'Image'}
        src={me}
        width={{ xs: '35vh', md: '40vh' }}
        height={{ xs: '35vh', md: '40vh' }}
        borderRadius={'50%'}
        p={'0.75rem'}
        mb={{ xs: '1rem', sm: 0 }}
        mr={{ xs: 0, md: '2rem' }}
      ></Box>
      <Box>
        <h1 className="font-bold text-3xl">
          Hi, I'm{' '}
          <span
            style={{
              background: info.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {info.firstName}
          </span>
          <span className={Style.hand}>🤚</span>
        </h1>
        <h2 className="font-bold text-lg">I'm {info.position}.</h2>
        <Box component={'ul'} p={'0.8rem'}>
          {info.miniBio.map((bio, index) => (
            <EmojiBullet key={index} text={bio.text} />
          ))}
        </Box>
        <Box
          display={'flex'}
          gap={'1.5rem'}
          justifyContent={'center'}
          alignContent={'center'}
          padding={'1rem'}
          fontSize={{ xs: '2rem', md: '2.5rem' }}
        >
          <>
            <Button
              style={{ background: info.gradient }}
              variant="contained"
              href={'/playground'}
            >
              Click Me To Explore
            </Button>
          </>
          <ConnectButton moralisAuth />
        </Box>
      </Box>
    </Box>
  )
}

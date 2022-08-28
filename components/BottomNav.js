import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import FavoriteIcon from '@mui/icons-material/Favorite'
import GithubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import Paper from '@mui/material/Paper'
import swal from 'sweetalert'

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0)
  const ref = React.useRef(null)

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            label="Twitter"
            href="https://twitter.com/Keyrxng"
            icon={<TwitterIcon />}
          />
          <BottomNavigationAction
            label="LinkedIn"
            href="https://linkedin.com/in/Keyrxng"
            icon={<LinkedInIcon />}
          />
          <BottomNavigationAction
            label="Github"
            href="https://github.com/Keyrxng"
            icon={<GithubIcon />}
          />{' '}
          <BottomNavigationAction
            label="Fiat to Crypto Payments"
            href="https://portal.keyrxng.xyz"
            icon={<PointOfSaleIcon />}
          />
          <BottomNavigationAction
            label="Donate"
            onClick={() =>
              swal(
                'EVM wallet address: 0x196Ff55Af7Ca5df332faf3A72972dDf6d5e109A4',
              )
            }
            icon={<FavoriteIcon />}
          />{' '}
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

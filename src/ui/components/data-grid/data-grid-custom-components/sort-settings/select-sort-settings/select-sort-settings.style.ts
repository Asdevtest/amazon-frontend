import { keyframes } from '@emotion/react'
import { makeStyles } from 'tss-react/mui'

const fadeIn = keyframes`
  0% {
    opacity: 0;
		display: none;
  }
  100% {
    opacity: 1;
		display: block;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
		display: block;
  }
  100% {
    opacity: 0;
		display: none;
  }
`

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',

    border: `1px solid ${theme.palette.input.customBorder}`,

    padding: '0 25px',
    borderRadius: '0px 7px 7px 0px',
  },

  menuContainer: {
    display: 'none',
    position: 'absolute',

    zIndex: 20,
    padding: 5,

    border: `1px solid ${theme.palette.background.second}`,
    borderRadius: '7px',

    animation: `${fadeOut} 0.3s ease-in-out`,

    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    background: theme.palette.background.general,
  },

  menuContainerAnimation: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    animation: `${fadeIn} 0.3s ease-in-out`,
  },

  searchInput: {
    height: '30px',
  },

  menuItems: {
    height: 204,
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  button: {
    overflow: 'unset',
    height: '30px',
  },
}))

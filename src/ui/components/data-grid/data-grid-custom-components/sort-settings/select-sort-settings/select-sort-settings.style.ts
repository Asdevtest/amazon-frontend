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
    height: '100%',
    position: 'relative',
  },

  buttonWrapper: {
    '& .ant-btn': {
      borderRadius: '0 16px 16px 0',
    },
  },

  menuContainer: {
    display: 'none',
    position: 'absolute',

    width: '320px',

    zIndex: 7,
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
    width: '100%',
  },

  menuItems: {
    width: '100%',
    height: 204,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',

    '& .ant-btn': {
      borderRadius: '7px',
    },
  },
}))

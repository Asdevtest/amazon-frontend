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
  wrapper: {
    position: 'relative',
  },

  button: {
    width: 115,
    padding: '2px 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    border: `1px solid ${theme.palette.background.second}`,
    borderRadius: 6,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
    maxWidth: '80%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  iconButton: {
    width: 12,
    height: 12,
    transform: 'rotate(0deg)',
    transition: 'transform .3s ease-in-out',
  },

  icon: {
    width: '12px !important',
    height: '12px !important',
  },

  iconRotate: {
    transform: 'rotate(180deg)',
  },

  menuContainer: {
    position: 'absolute',
    top: 27,
    right: 0,
    zIndex: 20,
    padding: 5,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    border: `1px solid ${theme.palette.background.second}`,
    borderRadius: 6,
    display: 'none',
    animation: `${fadeOut} 0.3s ease-in-out`,
  },

  menuContainerAnimation: {
    display: 'block',
    animation: `${fadeIn} 0.3s ease-in-out`,
  },

  menuItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  menuItem: {
    width: 240,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    opacity: 1,
    transition: '.3s ease',

    '&:hover': {
      background: theme.palette.background.second,
      borderRadius: 6,
      opacity: 0.8,
    },
  },

  menuItemText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  starIcon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.background.second,
    transition: 'color .3s',

    '&:hover': {
      color: theme.palette.background.general,
    },
  },

  starIconFavorite: {
    color: 'yellow',
  },
}))

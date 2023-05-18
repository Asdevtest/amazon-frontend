import { keyframes } from '@emotion/react'

import { makeStyles } from 'tss-react/mui'

const hypnoEye = keyframes`
 0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

export const useClassNames = makeStyles()((theme, props) => ({
  chip: {
    fontSize: '15px',
    fontWeight: '600',
    lineHeight: '20p',

    borderRadius: '4px',
    height: '36.5px',
    color: 'rgba(0,0,0,.7)',
    transition: '.7s ease-in-out',
    backgroundColor: props.color,

    cursor: 'pointer',
    '&:focus': {
      backgroundColor: props.colorHover,
      transform: 'scale(1.01)',
      color: '#fff',
    },
    '&:hover': {
      backgroundColor: props.colorHover,
      transform: 'scale(1.01)',
      color: 'rgba(255,255,255,.7)',
    },
  },

  chipActive: {
    color: '#fff',

    '&::before': {
      content: '""',
      backgroundColor: 'black',
      height: '36.5px',
      width: '36.5px',
      right: '30%',
      textAlign: 'center',
      borderRadius: '4px',
      opacity: '0.4',
      border: '7px solid white',
      animation: `${hypnoEye} .7s ease-in-out`,
    },
  },

  chipWrapper: {
    position: 'relative',
  },

  tooltipsWrapper: {
    position: 'absolute',
    top: '-10px',
    right: '-15px',
    zIndex: '10',
    display: 'flex',
  },

  tooltip: {
    width: '17px',
    height: '17px',
    color: 'red',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipInfo: {
    marginLeft: '3px',
    color: theme.palette.primary.main,
  },
}))

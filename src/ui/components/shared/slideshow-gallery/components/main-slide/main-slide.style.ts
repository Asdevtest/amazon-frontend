import { keyframes } from '@emotion/react'
import { makeStyles } from 'tss-react/mui'

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

export const useStyles = makeStyles()(() => ({
  mainSlide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.17)',
    cursor: 'pointer',
  },

  slideTransition: {
    textAlign: 'center',
    animation: `${fadeOut} 0.3s ease-in-out`,
  },

  mainSlideImg: {
    height: '100%',
    objectFit: 'contain',
  },

  document: {
    position: 'relative',
    height: '75%',
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity 0.3s ease-in-out',

    '&:hover': {
      svg: {
        opacity: 0.5,
      },

      span: {
        opacity: 1,
      },
    },
  },

  fileIcon: {
    height: '100% !important',
    width: '100% !important',
    opacity: 1,
  },

  linkText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    wordBreak: 'break-all',
  },

  iconPreloader: {
    height: '48px !important',
    width: '48px !important',
  },
}))

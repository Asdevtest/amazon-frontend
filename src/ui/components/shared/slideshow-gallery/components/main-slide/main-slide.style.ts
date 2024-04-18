import { keyframes } from '@emotion/react'
import { makeStyles } from 'tss-react/mui'

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
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
    animation: `${fadeOut} 0.3s ease-in-out`,
  },
}))

import { keyframes } from '@emotion/react'
import { makeStyles } from 'tss-react/mui'

const fadeIn = keyframes`
  0% {
    transform: translateY(-200%);
    opacity: 0;
    display: none;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    display: flex;
  }
`

const fadeOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
    display: flex;
  }
  100% {
    transform: translateY(-200%);
    opacity: 0;
    display: none;
  }
`

export const useStyles = makeStyles()(() => ({
  acceptMessageWrapper: {
    position: 'absolute',
    top: 0,
    left: '50vw',
    padding: '10px',
    marginTop: '63px',
    zIndex: 50,
    opacity: 0,
  },

  fadeInAnimation: {
    animation: `${fadeIn} 1s forwards`,
  },

  fadeOutAnimation: {
    animation: `${fadeOut} 1s forwards`,
  },

  alertRoot: {
    minWidth: 255,
    maxWidth: 510,
  },

  alertIcon: {
    alignItems: 'center',
  },
}))

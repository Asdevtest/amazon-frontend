/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-unused-vars */
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

export const useClassNames = makeStyles()(theme => ({
  acceptMessageWrapper: {
    position: 'absolute',
    top: 0,
    left: '50vw',
    padding: '10px',
    marginTop: '63px',
    zIndex: 999,
    opacity: 0,
  },

  fadeInAnimation: {
    animation: `${fadeIn} 1s forwards`,
  },

  fadeOutAnimation: {
    animation: `${fadeOut} 1s forwards`,
  },

  alertRoot: {
    width: 255,
  },

  alertIcon: {
    alignItems: 'center',
  },
}))

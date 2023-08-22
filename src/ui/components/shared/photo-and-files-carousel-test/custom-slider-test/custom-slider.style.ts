import { keyframes } from '@emotion/react'
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  wrapperAlignLeft: {
    justifyContent: 'flex-start',
  },

  wrapperAlignRight: {
    justifyContent: 'flex-end',
  },

  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },

  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  arrowIcon: {
    width: '30px !important',
    height: '30px !important',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  arrowIconDisable: {
    color: '#C4C4C4',
    cursor: 'auto',
  },

  smallArrow: {
    width: '20px !important',
    height: '20px !important',
  },

  mediumArrow: {
    width: '40px !important',
    height: '40px !important',
  },

  bigArrow: {
    width: '50px !important',
    height: '50px !important',
  },

  slideWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    width: 90,
  },

  slideSmall: {
    height: 48,
    width: 68,
  },

  slideMedium: {
    height: 128,
    width: 180,
  },

  slideBig: {
    height: 256,
    width: 360,
  },

  opacity: {
    opacity: 0,
  },

  slideLeftBefore: {
    animation: `${slideLeftBefore} 0.3s ease`,
  },

  slideLeftAfter: {
    animation: `${slideLeftAfter} 0.3s ease`,
  },

  slideRightBefore: {
    animation: `${slideRightBefore} 0.3s ease`,
  },

  slideRightAfter: {
    animation: `${slideRightAfter} 0.3s ease`,
  },

  documentWrapper: {
    width: '100%',
    height: '100%',

    '&:hover': {
      position: 'relative',

      '& > a:nth-of-type(2)': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
      },
    },
  },

  linkDocument: {
    display: 'none',
  },

  slide: {
    position: 'absolute',
    width: '100% !important',
    height: '100% !important',
    objectFit: 'contain',
    cursor: 'pointer',
  },

  currentSlideTitle: {
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
  },

  smallText: {
    fontSize: 12,
    lineHeight: '16px',
  },

  mediumText: {
    fontSize: 16,
    lineHeight: '22px',
  },

  bigText: {
    fontSize: 18,
    lineHeight: '25px',
  },
}))

const slideLeftBefore = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(-20%);
    opacity: 0;
  }
`

const slideLeftAfter = keyframes`
  0% {
    transform: translateX(20%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1
  }
`

const slideRightBefore = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(20%);
    opacity: 0;
  }
`

const slideRightAfter = keyframes`
  0% {
    transform: translateX(-20%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1
  }
`

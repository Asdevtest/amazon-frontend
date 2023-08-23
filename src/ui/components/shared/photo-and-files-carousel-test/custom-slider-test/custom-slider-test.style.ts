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
    width: '35px !important',
    height: '35px !important',
  },

  bigArrow: {
    width: '40px !important',
    height: '40px !important',
  },

  slideWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: 110,
    width: 146,
  },

  slideSmall: {
    height: '60px !important',
    width: '80px !important',
  },

  slideMedium: {
    height: '160px !important',
    width: '213px !important',
  },

  slideBig: {
    height: '300px !important',
    width: '400px !important',
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

  slideNoDocuments: {
    color: '#E0E0E0',
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
    fontSize: '12px !important',
    lineHeight: '16px !important',
  },

  mediumText: {
    fontSize: '16px !important',
    lineHeight: '22px !important',
  },

  bigText: {
    fontSize: '18px !important',
    lineHeight: '25px !important',
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

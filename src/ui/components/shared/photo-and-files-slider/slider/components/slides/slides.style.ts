import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  slidesWrapper: {
    overflow: 'hidden',
  },

  slides: {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out',

    height: 110,
    width: 146,
  },

  slideWrapper: {
    display: 'flex',
    flex: '1 0 100%',
    padding: '0 0.5px', // fix micro line of neighboring slide when mod is withAllFiles
  },

  slide: {
    width: '100% !important',
    height: '100% !important',
    objectFit: 'contain',
    cursor: 'pointer',
  },

  slideSmall: {
    height: '48px !important',
    width: '64px !important',
  },

  slideMedium: {
    height: '160px !important',
    width: '213px !important',
  },

  slideBig: {
    height: '300px !important',
    width: '550px !important',
  },

  documentWrapper: {
    width: '100%',
    height: '100%',

    '&:hover': {
      position: 'relative',

      '& > a:nth-of-type(1)': {
        opacity: 0.5,
        transition: '0.3s ease',
      },

      '& > a:nth-of-type(2)': {
        position: 'absolute',
        top: 0,
        left: 0,
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
    opacity: 0,
    transition: '0.3s ease',
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

  preloaderIcon: {
    width: '36px !important',
    height: '36px !important',
  },
}))

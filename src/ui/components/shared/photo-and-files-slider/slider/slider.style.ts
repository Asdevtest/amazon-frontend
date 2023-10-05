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

  mainSmall: {
    padding: '0 30px',
  },

  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  smallGap: {
    gap: 0,
  },

  bigGap: {
    gap: 40,
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
    width: '30px !important',
    height: '30px !important',
  },

  mediumArrow: {
    width: '35px !important',
    height: '35px !important',
  },

  bigArrow: {
    width: '40px !important',
    height: '40px !important',
  },

  hideArrow: {
    opacity: 0,
  },

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
    margin: '0 0.05px', // fix micro line of neighboring slide when mod is withAllFiles
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

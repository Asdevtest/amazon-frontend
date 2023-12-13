import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },

  mainSmall: {
    padding: '0 30px',
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

  slideNoDocuments: {
    color: '#E0E0E0',
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

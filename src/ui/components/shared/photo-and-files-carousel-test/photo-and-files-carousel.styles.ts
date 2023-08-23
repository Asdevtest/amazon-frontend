import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  directionColumn: {
    flexDirection: 'column',
  },

  wrapperAlignLeft: {
    alignItems: 'flex-start',
  },

  wrapperAlignRight: {
    alignItems: 'flex-end',
  },

  noFileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
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

  slide: {
    position: 'absolute',
    width: '100% !important',
    height: '100% !important',
    objectFit: 'contain',
    cursor: 'pointer',
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

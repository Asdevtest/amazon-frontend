import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  column: {
    flexDirection: 'column',
  },

  wrapperAlignLeft: {
    justifyContent: 'flex-start',
  },

  wrapperAlignRight: {
    justifyContent: 'flex-end',
  },

  noFileWrapper: {
    padding: 10,
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
    height: 110,
    width: 146,
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

  imagesModalBtn: {
    width: 40,
    height: 40,
  },

  activeMainIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    background: 'rgb(53, 112, 155)',
    color: '#F5CF00',
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
    borderRadius: 10,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainSlide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.1)',
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
  },

  slideTransition: {
    opacity: 0,
  },

  mainSlideImg: {
    objectFit: 'contain',
  },

  document: {
    position: 'relative',
    height: '75%',
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity 0.3s ease-in-out',

    '&:hover': {
      svg: {
        opacity: 0.5,
      },

      span: {
        opacity: 1,
      },
    },
  },

  fileIcon: {
    height: '100% !important',
    width: '100% !important',
    opacity: 1,
  },

  linkText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    wordBreak: 'break-all',
  },

  iconPreloader: {
    height: '36px !important',
    width: '36px !important',
  },
}))

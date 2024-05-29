import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  videoPlayerCustomWrapper: {
    position: 'relative',
    zIndex: 7,
    maxWidth: 1200,
  },

  videoPlayerCustom: {
    video: {
      maxHeight: '700px !important',
    },
  },

  document: {
    position: 'relative',
    height: '75%',
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease-in-out',

    '&:hover': {
      button: {
        opacity: 0.3,
      },

      span: {
        opacity: 1,
      },
    },
  },

  linkText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    wordBreak: 'break-all',
  },
}))

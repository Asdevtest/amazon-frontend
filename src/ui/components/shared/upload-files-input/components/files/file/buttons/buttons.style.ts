import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
  },

  iconButton: {
    display: 'flex',
    position: 'relative',
    width: 20,
    height: 20,
  },

  icon: {
    cursor: 'pointer',
    transition: '0.3s ease',
    opacity: 1,

    '&:hover': {
      opacity: 0.8,
    },
  },

  uploadInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 20,
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  },
}))

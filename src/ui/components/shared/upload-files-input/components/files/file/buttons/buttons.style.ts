import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  buttons: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
  },

  upload: {
    width: '16px',
    height: '16px',
    position: 'relative',
  },

  button: {
    width: '16px !important',
    height: '16px !important',
  },

  uploadInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 16,
    top: 0,
    left: 0,
    opacity: 0,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  controls: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },

  button: {
    position: 'relative',
    width: 30,
    height: 30,
    padding: 0,
    borderRadius: 7,
  },

  icon: {
    width: '20px !important',
    height: '20px !important',
  },

  starIcon: {
    color: '#faaf00',
  },

  pasteInput: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    borderRadius: 7,
  },
}))

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
  },

  starIcon: {
    color: '#faaf00',
  },

  pasteInput: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    borderRadius: 16,
  },
}))

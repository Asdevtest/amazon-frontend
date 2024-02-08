import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    position: 'relative',
    width: '100%',
  },

  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(0, 0, 0, 0.5)',
  },

  preloaderIcon: {
    color: '#fff',
  },
}))

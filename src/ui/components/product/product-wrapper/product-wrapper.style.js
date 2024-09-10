import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
    padding: 10,
  },

  customSwitcher: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 7,
  },
}))

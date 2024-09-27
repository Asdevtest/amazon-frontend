import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
  },

  customSwitcher: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 7,
  },
}))

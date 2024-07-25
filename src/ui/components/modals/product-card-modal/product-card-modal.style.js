import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 1560,
    height: 730,
    overflowY: 'auto',
  },

  clippedRoot: {
    height: 670,
  },

  footerWrapper: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 20,
  },
}))

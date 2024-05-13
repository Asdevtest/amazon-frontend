import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 1400,
    height: 730,
    overflowY: 'auto',
  },

  clippedRoot: {
    height: 670,
  },

  footerWrapper: {
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 20,
  },
}))

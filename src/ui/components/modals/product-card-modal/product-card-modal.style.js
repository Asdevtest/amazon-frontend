import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 1640,
    height: 730,
    overflowY: 'auto',
    padding: 10,
  },

  clippedRoot: {
    height: '660px',
  },

  footerWrapper: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 20,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    height: '100%',
    width: 1040,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  switcherWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  switcher: {
    display: 'flex',
    gap: 20,
  },
}))

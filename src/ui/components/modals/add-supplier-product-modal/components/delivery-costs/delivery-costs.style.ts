import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '10px',
  },

  currency: {
    pointerEvents: 'none',
    alignSelf: 'flex-end',
  },

  alignLeft: {
    alignSelf: 'flex-start',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
}))

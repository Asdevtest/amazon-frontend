import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  inProcess: {
    fontSize: '40px',
  },

  masterUserWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
}))

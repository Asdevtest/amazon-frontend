import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  reverted: {
    flexDirection: 'row-reverse',
  },
}))

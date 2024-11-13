import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
  },

  center: {
    justifyContent: 'center',
  },

  mask: {
    padding: '0 14px',
    display: 'flex',
    gap: '20px',
  },
}))

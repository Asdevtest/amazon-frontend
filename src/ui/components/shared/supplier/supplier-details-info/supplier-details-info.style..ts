import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },

  feedback: {
    gap: '3px',
    padding: 0,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  feedback: {
    gap: '3px',
    padding: 0,
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
}))

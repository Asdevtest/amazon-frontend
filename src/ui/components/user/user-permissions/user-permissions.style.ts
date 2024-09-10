import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))

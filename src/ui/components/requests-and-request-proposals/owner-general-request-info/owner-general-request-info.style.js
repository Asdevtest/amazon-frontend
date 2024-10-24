import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: '10px',
  },
}))

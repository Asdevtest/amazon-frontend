import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))
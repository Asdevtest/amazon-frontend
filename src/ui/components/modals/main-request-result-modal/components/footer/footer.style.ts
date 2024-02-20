import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },
}))

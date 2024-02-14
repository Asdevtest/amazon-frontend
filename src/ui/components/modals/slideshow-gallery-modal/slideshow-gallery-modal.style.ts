import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },
}))

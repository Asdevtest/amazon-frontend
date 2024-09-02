import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 20,
  },

  tableWrapper: {
    height: '77vh',
    width: '100%',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  card: {
    padding: 12,
    borderRadius: 12,
    boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.17)',

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
  },
}))

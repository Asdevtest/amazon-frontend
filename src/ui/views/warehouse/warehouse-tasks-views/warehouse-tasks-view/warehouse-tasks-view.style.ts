import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  title: {
    fontSize: '18px',
    lineHeight: '25px',
    marginBottom: 20,
  },

  flexColumn: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
}))
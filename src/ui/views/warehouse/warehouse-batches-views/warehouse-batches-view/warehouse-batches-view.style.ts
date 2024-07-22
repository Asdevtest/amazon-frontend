import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: 200,
    display: 'flex',
    gap: 20,
    flexDirection: 'column',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
  },
}))

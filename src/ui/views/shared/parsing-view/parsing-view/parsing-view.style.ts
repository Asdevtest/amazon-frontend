import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  buttons: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    marginBottom: '20px',
  },
}))

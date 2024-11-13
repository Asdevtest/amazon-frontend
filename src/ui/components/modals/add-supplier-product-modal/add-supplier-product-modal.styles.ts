import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '800px',
  },
}))

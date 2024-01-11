import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  button: {
    width: '100%',
    height: 30,
  },
}))

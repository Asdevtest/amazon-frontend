import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: '10px',
  },
}))

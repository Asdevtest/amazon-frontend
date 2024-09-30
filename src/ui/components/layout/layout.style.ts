import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: '100vh',
  },

  content: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
    background: theme.palette.background.second,
  },
}))

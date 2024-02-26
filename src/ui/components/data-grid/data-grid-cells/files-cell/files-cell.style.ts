import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  visibilityButton: {
    height: 32,
    padding: '0 10px',
  },

  visibilityIcon: {
    width: '20px !important',
    height: '20px !important',
    color: theme.palette.primary.main,
  },
}))

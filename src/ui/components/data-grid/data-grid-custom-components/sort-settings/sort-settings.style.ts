import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    borderRadius: '100px',
    boxShadow: theme.palette.button.defaultBoxShadow,
  },
}))

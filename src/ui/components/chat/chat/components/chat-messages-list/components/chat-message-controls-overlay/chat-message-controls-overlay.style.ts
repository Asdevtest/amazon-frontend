import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  button: {
    width: '100%',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
  },
}))

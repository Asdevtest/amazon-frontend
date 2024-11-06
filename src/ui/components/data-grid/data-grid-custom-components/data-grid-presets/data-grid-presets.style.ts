import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  presetsSelect: {
    height: '32px',
    boxShadow: theme.palette.button.defaultBoxShadow,
    borderRadius: '25px',
  },
}))

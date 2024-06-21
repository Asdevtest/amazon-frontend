import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    height: 'auto !important',
    color: theme.palette.text.general,
    padding: '6px 8px',
    borderRadius: '7px',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },
}))

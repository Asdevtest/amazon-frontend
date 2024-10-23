import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  text: {
    marginLeft: 5,
    background: theme.palette.button.badge,
    padding: '2px',
    fontSize: '14px',
    borderRadius: 6,
    color: '#fff',
  },

  icon: {
    background: '#fff',
  },
}))

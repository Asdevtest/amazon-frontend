import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  startIcon: {
    marginRight: 5,
  },

  badge: {
    marginLeft: 5,
    width: 'fit-content',
    background: theme.palette.primary.main,
    padding: '2px 6px',
    fontSize: '14px',
    lineHeight: '14px',
    borderRadius: 6,
    color: '#fff',
  },
}))

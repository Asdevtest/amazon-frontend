import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  badge: {
    height: 20,
    width: 'fit-content',
    background: theme.palette.primary.main,
    padding: '1px 6px',
    fontSize: '12px',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
}))

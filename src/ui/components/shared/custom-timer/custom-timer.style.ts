import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 'max-content',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.red,
    background: 'rgba(255,204,199, 0.3)',
    borderRadius: 25,
    boxShadow: '0 0 8px 4px rgba(255,204,199, 0.2)',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    gap: '5px',

    backgroundColor: theme?.palette?.background?.general,
    boxShadow: theme?.palette?.boxShadow?.paper,
    borderRadius: '16px',
    padding: '10px',
  },
}))

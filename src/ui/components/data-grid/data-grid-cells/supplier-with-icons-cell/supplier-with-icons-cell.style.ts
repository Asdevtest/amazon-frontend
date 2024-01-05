import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  icons: {
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    position: 'absolute',
    top: 1,
    left: 1,
  },

  text: {
    padding: 2,
    color: '#fff',
    fontSize: 11,
    lineHeight: '11px',
    background: theme.palette.primary.main,
    borderRadius: 4,
  },
}))

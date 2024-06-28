import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 8,
  },

  info: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
  },

  button: {
    height: 38,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    padding: '5px 25px',
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.text.general,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 6,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&: hover': {
      opacity: 0.5,
    },
  },
}))

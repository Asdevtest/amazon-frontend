import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 600,
    height: 510,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },

  titleContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '28px',
    fontWeight: 600,
  },

  activeSessions: {
    marginLeft: 'auto',
    lineHeight: '28px',
    fontWeight: 500,
    color: theme.palette.primary.main,

    '&:hover': {
      textDecoration: 'underline',
      opacity: 0.8,
      transition: '.3s ease',
    },
  },
}))

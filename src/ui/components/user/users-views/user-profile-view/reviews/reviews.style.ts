import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  titleCenter: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  body: {
    padding: '10px 0',
    marginTop: 10,
    border: '1px solid #e0e0e0',
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 10,
  },

  scroll_Y: {
    padding: '0 20px',
    height: '68vh',
    overflowY: 'auto',
  },

  lastReview: {
    'div:last-child': {
      borderBottom: 'none',
    },
  },
}))

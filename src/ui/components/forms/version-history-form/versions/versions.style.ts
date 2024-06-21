import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    height: 280,
    paddingRight: 5,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontSize: 14,
    lineHeight: '19px',
  },

  noData: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  buttonVersion: {
    height: 40,
    padding: 10,
    textAlign: 'left',
    border: '1px solid #E0E0E0',
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 8,
    opacity: 1,
    transition: '0.3s ease',

    '&:hover': {
      opacity: 0.8,
    },
  },

  text: {
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))

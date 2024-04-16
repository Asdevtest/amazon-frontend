import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 500,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  back: {
    margin: 0,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  versions: {
    height: 290,
    paddingRight: 5,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontSize: 14,
    lineHeight: '19px',
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

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))

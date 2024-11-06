import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '370px',
    height: '450px',
  },

  title: {
    fontSize: '18px',
    fontWeight: '700',
  },

  inputSearch: {
    width: '100%',
  },

  chatList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '350px',
    borderRadius: '20px',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    padding: '5px 10px 5px 5px',
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

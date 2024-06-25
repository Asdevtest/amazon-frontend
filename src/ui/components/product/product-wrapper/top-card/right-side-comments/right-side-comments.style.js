import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    color: theme.palette.text.second,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 20,
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',
    padding: 0,
  },

  errorActive: {
    borderColor: theme.palette.text.red,
  },

  buttonsWrapper: {
    position: 'fixed',
    bottom: 50,
    right: 50,
    zIndex: 7,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))

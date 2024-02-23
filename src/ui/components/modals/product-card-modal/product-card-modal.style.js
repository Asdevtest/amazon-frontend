import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalWrapper: {
    background: theme.palette.background.second,
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 1640,
    height: 730,
    overflowY: 'auto',
    padding: '0 10px',
  },

  clippedRoot: {
    height: '660px',
  },

  footerWrapper: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 20,
  },

  buttonNormalNoMargin: {
    marginRight: 0,
  },

  restoreBtn: {
    flexGrow: 1,
    marginLeft: '15px',
  },
}))

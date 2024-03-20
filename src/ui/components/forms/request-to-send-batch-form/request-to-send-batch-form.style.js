import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  content: {
    width: '100%',
  },
  modalTitle: {
    color: theme.palette.text.general,
  },

  boxesWrapper: {
    marginTop: '20px',
    overflowY: 'auto',
    maxHeight: '550px',
  },
  warningWrapper: {
    marginTop: '20px',
  },
  warningText: {
    color: theme.palette.text.red,
  },
  noWarningText: {
    color: theme.palette.primary.main,
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
    marginRight: 15,
  },
}))

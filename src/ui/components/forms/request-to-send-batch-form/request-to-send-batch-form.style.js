import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    color: 'red',
  },
  noWarningText: {
    color: theme.palette.primary.main,
  },
  btnsWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    display: 'flex',
  },
  btnClose: {
    marginLeft: '10px',
  },
}))

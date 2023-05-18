import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '480px',
    height: 'auto',
  },
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: 22,
    fontWeight: 600,
    lineHeight: '30px',
    marginBottom: 20,
  },
  field: {
    width: '100%',
  },

  label: {
    height: 19,
    color: theme.palette.text.second,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: 5,
  },
  saveBox: {
    display: 'flex',
    justifyContent: 'end',
    gap: 20,
    marginTop: '20px',
  },
  saveBtn: {
    width: '123px',
    height: '40px',
  },
  closeBtn: {
    width: '123px',
    height: '40px',
    color: theme.palette.text.general,
  },
  nameField: {
    height: 'auto',
    width: '100%',
    overflowY: 'hidden',
  },
}))

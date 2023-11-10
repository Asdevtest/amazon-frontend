import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '420px',
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '25px',
    marginBottom: '20px',
  },

  uploadInput: {
    margin: '0 15px 0 5px',
  },

  saveBox: {
    marginTop: '20px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
  },

  actionButton: {
    width: '190px',
    height: '40px',
  },

  cancelButton: {
    color: `${theme.palette.text.general} !important`,
  },
}))

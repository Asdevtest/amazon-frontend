import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '400px',
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '25px',
    marginBottom: '20px',
  },

  input: {
    width: '400px',
  },

  saveBox: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
  },

  actionButton: {
    width: '179px',
    height: '40px',
  },

  cancelButton: {
    color: `${theme.palette.text.general} !important`,
  },
}))

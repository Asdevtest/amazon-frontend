import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: 440,
    padding: 10,
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '25px',
    marginBottom: '20px',
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

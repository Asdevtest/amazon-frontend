import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  button: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    textTransform: 'none',
  },

  title: {
    color: theme.palette.text.general,
  },
  positiveMsg: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: '5px',
    marginBottom: '16px',
    padding: '20px',
    color: theme.palette.text.general,
  },
  negativeMsg: {
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: '5px',
    marginBottom: '16px',
    padding: '20px',
    color: theme.palette.error.dark,
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 50,
  },
  modalContainer: {
    minWidth: '460px',
  },
  confirmModal: {
    width: '360px',
  },

  modalTextArea: {
    height: '100px',
    width: '100%',
    overflowY: 'hidden',
  },
}))

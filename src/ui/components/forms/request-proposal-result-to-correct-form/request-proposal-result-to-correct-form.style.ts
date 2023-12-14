import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 600,
    padding: 10,
  },

  reasonInput: {
    height: 'auto',
    width: '100%',
  },

  inputWrapper: {
    width: '50px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  btnWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },

  label: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  input: {
    width: '100px',
    border: 'none',
    padding: 0,
    margin: 0,
    borderRadius: 0,
    borderBottom: '1px solid #e0e0e0',
    '& >::-webkit-outer-spin-button,::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
      padding: 0,
    },
  },
  inputField: {
    padding: '0 !important',
    margin: '0 !important',
  },

  inputLabel: {
    color: theme.palette.text.second,
    padding: 0,
    margin: 0,
  },

  btnSubmit: {
    width: '259px',
    height: '40px',
  },
  inputsWrapper: {
    display: 'flex',
    gap: 30,
  },

  reasonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  time: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '10px',
  },

  totalTime: {
    marginBottom: '30px',
  },

  uploadFilesInput: {
    paddingRight: 10,
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  button: {
    color: 'white',
    backgroundColor: 'rgb(0, 123, 255)',
    textTransform: 'none',
  },
  positiveMsg: {
    border: `1px solid ${theme.palette.success.main}`,
    borderRadius: '5px',
    marginBottom: '16px',
    padding: '20px',
    color: theme.palette.success.dark,
  },
  negativeMsg: {
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: '5px',
    marginBottom: '16px',
    padding: '20px',
    color: theme.palette.error.dark,
  },
  buttonWrapper: {
    textAlign: 'right',
    '& > button': {
      marginRight: '20px',
    },
    '& > button:last-child': {
      marginRight: '0px',
    },
  },
  modalContainer: {
    minWidth: '460px',
  },
  confirmModal: {
    width: '360px',
  },
  multilineField: {
    height: 'auto',
    width: '100%',
  },

  modalTextArea: {
    height: '100px',
    width: '100%',
    overflowY: 'hidden',
  },
}))

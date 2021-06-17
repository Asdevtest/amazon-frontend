import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  button: {
    color: 'white',
    backgroundColor: 'rgb(0, 123, 255)',
    textTransform: 'none',
  },
  balanceButtonsWrapper: {
    display: 'flex',
    '& > button': {
      marginRight: '40px',
    },
    '& > button:last-child': {
      marginRight: '0px',
    },
  },
  buttonWrapper: {
    textAlign: 'right',
  },
  modalContainer: {
    minWidth: '460px',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-12px',
    marginTop: '-12px',
    marginBottom: '8px',
  },
  checkboxLabel: {
    fontWeight: 600,
  },
}))

import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  modalTitle: {
    color: 'rgb(61, 81, 112)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  buttonWrapper: {
    padding: '16px',
    marginRight: '0px',
    borderTop: '1px solid rgb(224,224,224)',
  },
  tableWrapper: {
    marginTop: '24px',
    width: '100%',
    height: '100%',
  },
  buttonsWrapper: {
    '& button': {
      marginRight: theme.spacing(2),
    },
    '& button:last-child': {
      marginRight: 0,
    },
  },
  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  filterBtnWrapper: {
    marginBottom: '10px',
  },

  filterBtn: {
    marginLeft: '10px',
    color: '#007bff',
    marginBottom: '5px',

    fontSize: '16px',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: '#007bff',
      transform: 'scale(1.01)',
    },
  },

  currentFilterBtn: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    fontWeight: 'bold',
    marginBottom: '0',

    borderBottom: '5px solid #0460DE',
  },
}))

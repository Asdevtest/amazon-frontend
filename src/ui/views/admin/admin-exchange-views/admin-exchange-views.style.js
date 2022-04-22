import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  balanceTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
    marginBottom: '24px',
  },
  mb5: {
    marginBottom: theme.spacing(5),
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  tableWrapper: {
    marginTop: '24px',
    width: '100%',
    height: '100%',
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

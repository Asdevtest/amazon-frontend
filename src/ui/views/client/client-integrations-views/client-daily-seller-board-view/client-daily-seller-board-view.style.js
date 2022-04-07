import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },
  buttonsWrapper: {
    textAlign: 'right',
  },
  tableWrapper: {
    marginTop: '10px',
  },
  mainTitle: {
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
  },

  button: {
    marginLeft: '10px',
  },

  shopsFiltersWrapper: {
    marginBottom: '10px',
  },

  selectedShopBtn: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
  },
}))

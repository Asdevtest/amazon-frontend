import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },
  button: {
    marginRight: '24px',
  },
  buttonsWrapper: {
    textAlign: 'right',
  },
  tableWrapper: {
    marginTop: '24px',
  },

  shopsFiltersWrapper: {
    marginBottom: '10px',
    display: 'flex',
  },

  selectedShopBtn: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
  },
}))

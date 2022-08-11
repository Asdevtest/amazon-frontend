import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },
  button: {
    marginBottom: 5,

    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
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
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
  },

  dataGridWrapper: {
    height: '73vh',
    overflow: 'auto',
  },
}))

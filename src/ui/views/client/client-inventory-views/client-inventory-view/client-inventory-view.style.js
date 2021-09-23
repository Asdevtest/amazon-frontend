import {createStyles} from '@material-ui/core'

export const styles = createStyles({
  cardWidthTest: {
    width: '200px',
  },
  mainTitle: {
    marginTop: '24px',
  },
  addProductBtnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
  },
  tableWrapper: {
    minWidth: '100%',
    height: '83vh',
  },

  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
})

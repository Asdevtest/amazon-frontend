import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
    height: '80vh',
  },

  addProductBtnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
  },
}))

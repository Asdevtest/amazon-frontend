import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  emptyTableWrapper: {
    width: '100%',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTableText: {
    marginTop: '30px',
  },
}))

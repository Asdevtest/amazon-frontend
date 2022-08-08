import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  vacantDealsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
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

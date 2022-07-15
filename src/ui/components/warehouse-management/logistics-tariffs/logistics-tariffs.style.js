import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    flexDirection: 'column',
    minHeight: '85vh',
  },
  placeAddBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  placeAddBtn: {
    width: '159px',
    height: '40px',
  },
}))

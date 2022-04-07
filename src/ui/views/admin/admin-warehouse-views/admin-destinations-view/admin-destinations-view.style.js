import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
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
    margin: '15px 0',
  },
}))

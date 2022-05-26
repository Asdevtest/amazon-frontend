import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  scrollViewWrapper: {
    width: '100%',
    height: '60%',
  },
  bottomPartWrapper: {
    backgroundColor: 'white',
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
  },
  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '10px',
  },
}))

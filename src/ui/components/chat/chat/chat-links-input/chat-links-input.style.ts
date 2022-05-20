import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    overflow: 'scroll',
    height: '100%',
    padding: '10px 5px',
  },
  linkWrapper: {
    marginBottom: '10px',
    width: '100%',
  },
  linkInput: {
    width: '100%',
    height: '70px',
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    minWidth: '500px',
  },
  title: {
    marginBottom: '20px',
  },
  btn: {
    marginLeft: '10px',
  },
}))

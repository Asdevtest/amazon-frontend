import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  button: {
    marginLeft: '10px',
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  rangeField: {
    width: '250px',
  },
}))

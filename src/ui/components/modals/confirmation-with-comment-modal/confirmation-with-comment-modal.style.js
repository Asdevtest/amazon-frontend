import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '250px',
  },

  button: {
    marginRight: '10px',
  },
}))

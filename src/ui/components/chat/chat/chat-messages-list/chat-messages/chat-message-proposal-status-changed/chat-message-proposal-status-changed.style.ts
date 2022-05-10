import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    padding: '10px 0',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  statusTextDesciption: {
    color: 'grey',
    fontSize: '18px',
  },
  statusText: {
    color: 'black',
    fontSize: '15px',
  },
}))

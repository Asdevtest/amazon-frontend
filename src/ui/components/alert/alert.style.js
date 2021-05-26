import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles({
  root: {
    padding: '6px 16px',
    borderRadius: '4px',
  },
  success: {
    color: '#659375',
    backgroundColor: '#dbf2e3',
  },
  warning: {
    color: '#856404',
    backgroundColor: '#fff3cd',
  },
})

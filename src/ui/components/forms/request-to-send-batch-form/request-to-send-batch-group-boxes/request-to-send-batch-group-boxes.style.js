import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  dialogContextClassName: {},
  table: {
    borderCollapse: 'collapse',
    border: 0,
    height: '100px',
    width: '100%',
  },
  tableWrapper: {
    border: '2px solid grey',
    marginBottom: '20px',
  },
  tableWrapperInfo: {
    fontSize: '16px',
    textAlign: 'center',
  },
  block: {
    height: '50px',
    backgroundColor: 'f6b2b3a4',
  },
  boxWrapper: {
    width: '100%',
  },
}))

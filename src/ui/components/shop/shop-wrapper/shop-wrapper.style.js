import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    boxShadow: 'inset 0 -1px 0 0 #E6ECF0',
  },
  indicator: {
    backgroundColor: '#1da1f2',
  },
  row: {
    width: '100%',
    padding: '0 25px',
    margin: '0 auto',
  },
  chartsWrapper: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
}))

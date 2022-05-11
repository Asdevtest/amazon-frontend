import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    padding: '10px 26px',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  rootGreen: {
    backgroundColor: '#D9FAE5',
  },
  labelWrapper: {},
  labelText: {
    color: '#354256',
    fontWeight: 18,
    textAlign: 'center',
  },
  valueWrapper: {},
  valueText: {
    color: '#354256',
    fontSize: 18,
    textAlign: 'center',
  },
}))

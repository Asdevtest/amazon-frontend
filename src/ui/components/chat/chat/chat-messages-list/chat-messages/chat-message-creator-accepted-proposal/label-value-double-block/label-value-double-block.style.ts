import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    padding: '20px 17px',
    backgroundColor: '#ffffff',
    minWidth: 306,
  },
  rootGreen: {
    backgroundColor: '#D9FAE5',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  labelWrapper: {},
  labelText: {
    color: '#354256',
    fontSize: 18,
  },
  valueWrapper: {},
  valueText: {
    color: '#354256',
    fontSize: 18,
  },
  rowNotFirst: {
    marginTop: 20,
  },
}))

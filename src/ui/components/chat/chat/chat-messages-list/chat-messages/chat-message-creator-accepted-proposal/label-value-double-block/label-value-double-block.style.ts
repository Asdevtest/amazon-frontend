import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    color: theme.palette.text.second,
    fontSize: 18,
  },
  valueWrapper: {},
  valueText: {
    color: theme.palette.text.second,
    fontSize: 18,
  },
  rowNotFirst: {
    marginTop: 20,
  },
}))

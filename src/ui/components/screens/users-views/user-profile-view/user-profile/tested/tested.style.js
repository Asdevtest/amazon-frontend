import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  checkedStrategyRow: {
    display: 'flex',
    alignItems: 'center',
  },
  acUnitIcon: {
    color: '#119611',
    marginRight: '16px',
  },
  paper: {
    marginTop: '20px',
    width: '470px',
    border: '1px solid #C8CED3',
    marginRight: '16px',
    padding: '8px 16px',
    height: 'max-content',
  },
  divider: {
    margin: '8px -16px',
  },
}))

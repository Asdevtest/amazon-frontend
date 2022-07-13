import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  text: {
    color: '#001029',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    color: '#001029',
    marginBottom: '26px',
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
    // border: '1px solid #C8CED3',
    marginRight: '16px',
    padding: '8px 16px',
    height: 'max-content',
  },
  divider: {
    margin: '8px -16px',
  },
}))

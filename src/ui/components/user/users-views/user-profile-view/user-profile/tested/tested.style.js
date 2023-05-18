import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  text: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    color: theme.palette.text.general,
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
    marginRight: '16px',
    padding: '8px 16px',
    height: 'max-content',
  },

  miss: {
    color: theme.palette.text.second,
  },
}))

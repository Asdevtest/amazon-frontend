import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  text: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',

    marginBottom: '20px',
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
    width: '470px',

    padding: '8px 16px',
    height: 'max-content',
  },

  miss: {
    color: theme.palette.text.secondary,
  },
}))

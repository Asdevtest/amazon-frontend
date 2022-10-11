import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: '10px 15px',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rootGreen: {
    backgroundColor: '#D9FAE5',
  },
  labelWrapper: {},
  labelText: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,

    textAlign: 'center',
  },
  valueWrapper: {},
  valueText: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    textAlign: 'center',
  },
}))

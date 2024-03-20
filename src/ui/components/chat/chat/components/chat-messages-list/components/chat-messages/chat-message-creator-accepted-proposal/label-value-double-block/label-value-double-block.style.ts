import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '20px 17px',
    backgroundColor: theme.palette.background.general,
    minWidth: 306,

    borderRadius: 4,
  },
  rootGreen: {
    backgroundColor: theme.palette.background.green,
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

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: '10px 15px',
    backgroundColor: theme.palette.background.general,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  rootGreen: {
    // backgroundColor: '#D9FAE5',

    backgroundColor: theme.palette.background.green,
  },

  rootYellow: {
    backgroundColor: theme.palette.background.yellow,
  },
  labelText: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },

  valueText: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
}))

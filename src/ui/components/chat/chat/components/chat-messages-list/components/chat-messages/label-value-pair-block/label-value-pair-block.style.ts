import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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
    backgroundColor: theme.palette.background.green,
  },

  rootYellow: {
    backgroundColor: theme.palette.background.yellow,
  },
  labelText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
  },

  valueText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
  },
}))

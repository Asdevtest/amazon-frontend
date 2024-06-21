import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '80px',
  },
  label: {
    color: theme.palette.text.second,
    marginRight: '8px',
  },

  alarm: {
    border: '1px solid red',
  },
}))

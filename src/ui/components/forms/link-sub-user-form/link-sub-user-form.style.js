import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 400,
    padding: 10,
  },

  title: {
    marginBottom: 20,
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  labelField: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))

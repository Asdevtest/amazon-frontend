import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 480,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
  },

  field: {
    margin: 0,
  },

  label: {
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: 5,
    color: theme.palette.text.second,
  },

  nameField: {
    height: 'auto',
    width: '100%',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  link: {
    padding: 0,
    marginBottom: 20,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  editUser: {
    marginTop: 'auto',
  },
}))

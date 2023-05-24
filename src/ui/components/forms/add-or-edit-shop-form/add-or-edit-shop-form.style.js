import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minWidth: '500px',
  },

  form: {
    marginTop: 30,
  },
  cancelBtn: {
    marginLeft: '50px',

    color: theme.palette.text.general,
  },

  button: {
    minWidth: 185,
    padding: '0 30px',
  },

  descriptionField: {
    width: '100%',
    overflowY: 'hidden',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',

    color: theme.palette.text.general,
  },
}))

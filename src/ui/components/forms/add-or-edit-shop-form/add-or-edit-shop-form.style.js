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
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    width: '100%',
    overflowY: 'hidden',
  },

  allowUrlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  urlInputWrapper: {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
  },

  httpMethodSelect: {
    height: '65px',
    width: '95px',
  },

  urlInput: {
    overflowY: 'auto',
    whiteSpace: 'wrap',
    height: '65px',
    marginRight: '20px',
    width: '450px',
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

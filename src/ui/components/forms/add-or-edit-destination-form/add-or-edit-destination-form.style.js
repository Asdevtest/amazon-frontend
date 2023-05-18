import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minWidth: '400px',
  },

  button: {
    marginLeft: '10px',
    color: theme.palette.text.general,
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  standartText: {
    color: theme.palette.text.general,
  },

  descriptionField: {
    height: '100px',
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

  form: {
    marginTop: '20px',
  },

  btnsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

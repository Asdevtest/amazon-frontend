import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minWidth: '500px',
  },

  mainTitle: {
    color: theme.palette.text.general,
    marginBottom: 15,
  },

  deleteBtn: {
    color: theme.palette.text.general,
  },

  selectOption: {
    color: theme.palette.text.general,
  },

  button: {
    marginLeft: '10px',
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
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

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 30,
  },
}))

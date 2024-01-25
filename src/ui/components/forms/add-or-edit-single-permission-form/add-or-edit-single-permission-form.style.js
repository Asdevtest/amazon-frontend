import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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
    gap: 20,
  },

  httpMethodSelect: {
    height: 65,
    width: 115,
  },

  urlInput: {
    overflowY: 'auto',
    whiteSpace: 'wrap',
    height: 65,
    width: 430,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 30,
  },
}))

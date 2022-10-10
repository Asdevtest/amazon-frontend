import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    minWidth: '500px',
  },

  form: {
    marginTop: 30,
  },
  cancelBtn: {
    marginLeft: '50px',
    // backgroundColor: '#fff',
  },

  button: {
    minWidth: 185,
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

    color: '#001029',
  },
}))

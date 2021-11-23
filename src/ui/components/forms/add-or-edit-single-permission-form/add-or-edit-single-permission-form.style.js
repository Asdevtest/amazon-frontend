import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    minWidth: '500px',
  },

  button: {
    marginLeft: '10px',
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    minHeight: '100px',
    width: '100%',
    overflowY: 'scroll',
  },

  allowUrlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  urlInputWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  urlInput: {
    overflowY: 'scroll',
    whiteSpace: 'wrap',
    height: '65px',

    width: '450px',
  },
}))

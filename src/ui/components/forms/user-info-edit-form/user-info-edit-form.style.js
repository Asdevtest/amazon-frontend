import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    minWidth: '500px',
    flexDirection: 'column',
  },

  mainTitle: {
    marginBottom: '30px',
  },

  link: {
    width: '500px',
    height: '50px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },

  noSettingsWarning: {
    color: 'red',
  },

  cancelButton: {
    marginLeft: '10px',
  },

  btnsWrapper: {
    display: 'flex',
    margin: '30px 20px 10px 0',
    justifyContent: 'flex-end',
  },

  cancelBtn: {
    marginLeft: '30px',
  },

  textField: {
    width: '100%',
    minHeight: '40px',
    color: 'rgba(61, 81, 112, 1)',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },
}))

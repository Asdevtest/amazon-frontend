import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    minWidth: '500px',
    flexDirection: 'column',
  },

  link: {
    width: '500px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },

  noSettingsWarning: {
    color: 'red',
  },

  cancelButton: {
    marginLeft: '10px',
  },

  textField: {
    width: '100%',
    minHeight: '60px',
    color: 'rgba(61, 81, 112, 1)',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
}))

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
    height: '50px',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
  },

  noSettingsWarning: {
    color: 'red',
  },

  cancelButton: {
    marginLeft: '10px',
  },
}))

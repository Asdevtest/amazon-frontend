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

  allowPermissions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '1px solid rgba(0,0,0,.3)',
    borderRadius: '10px',
    padding: '5px',
  },

  urlInput: {
    overflowY: 'scroll',
    whiteSpace: 'wrap',
    height: '65px',

    width: '450px',
  },

  permissionSelect: {
    maxWidth: '200px',
  },

  permissionsSubTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
  },

  selectWrapper: {
    display: 'flex',
    alignItems: 'center',

    gap: '10px',
  },

  selectChoose: {
    fontSize: '26px',
  },

  singlePermission: {
    fontSize: '18px',
    lineHeight: '1.5',
    color: 'rgba(0, 123, 255, 1)',
  },

  newSinglePermissionWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}))

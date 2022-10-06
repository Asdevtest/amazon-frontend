import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '650px',
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

  allowPermissions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '1px solid rgba(0,0,0,.3)',
    borderRadius: '10px',
    padding: '5px',
  },

  urlInput: {
    overflowY: 'auto',
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

  selectModalBtnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    bottom: '0',
    right: '0',
    zIndex: 999,
  },
}))

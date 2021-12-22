import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '900px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
  },

  form: {
    display: 'flex',
  },

  buttonsWrapper: {
    margin: 'auto 0 0 ',
    position: 'sticky',
    bottom: '0',
    left: '0',
  },

  divider: {
    margin: '15px',
  },

  permGroupBtn: {
    marginLeft: '10px',
    width: '150px',
    height: '30px',
    fontSize: '11px',
  },

  permGroupSubWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  permGroup: {
    padding: '5px',
    border: '1px solid rgba(0,0,0, .3)',
    borderRadius: '10px',
  },

  permissionSelect: {
    maxWidth: '200px',
    marginBottom: '20px',
  },

  permissionWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  permissionsGroupWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: '20px',
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

  permissionsSubTitle: {
    fontWeight: 'bold',
  },

  selectModalBtnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    bottom: '0',
    right: '0',
  },
}))

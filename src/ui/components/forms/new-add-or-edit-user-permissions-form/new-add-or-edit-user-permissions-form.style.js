import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '1000px',
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
  },

  form: {
    display: 'flex',
    padding: '5px',
  },

  buttonsWrapper: {
    margin: 'auto 0 0 ',
    position: 'sticky',
    bottom: '0',
    left: '0',
  },

  divider: {
    margin: '20px',
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
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translate(0%, -3%)',
    },
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
  // **************************************

  leftSideWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    paddingTop: '15px',
  },

  rightSideWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
  },

  permissionGroupsToSelectItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  permissionGroupsToSelectItem: {
    width: '100%',
    display: 'flex',
    padding: '5px',
    border: '1px solid rgba(0,0,0, .3)',
    borderRadius: '10px',
    marginBottom: '4px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  permissionGroupsToSelectCheckboxWrapper: {
    border: '1px solid rgba(0,0,0, .1)',
    borderRadius: '10px',
    margin: '0 0 4px 10px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  selectedItem: {
    border: '1px solid #007BFF',
  },

  keyPermission: {
    color: '#007BFF',
    fontWeight: 'bold',
  },

  tabWillBeOpened: {
    backgroundColor: 'rgba(0,123,255, 0.4)',
  },
}))

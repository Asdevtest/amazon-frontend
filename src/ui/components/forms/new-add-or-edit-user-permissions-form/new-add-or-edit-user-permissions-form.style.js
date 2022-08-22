import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '674px',
    height: '619px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },

  form: {
    display: 'flex',
    padding: '5px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '30px',
    gap: '10px',
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
    width: '152px',
    height: '40px',
  },
  cancelBtn: {
    color: '#001029',
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    minHeight: '100px',
    width: '100%',
    overflowY: 'auto',
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
    overflowY: 'auto',
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
    height: '465px',
    overflow: 'auto',
    padding: '0 2px',
    minWidth: '300px',
  },

  rightSideWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    height: '465px',
    overflow: 'auto',
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

  // root: {
  //   width: '100%',
  //   boxShadow: 'inset 0 -1px 0 0 #E6ECF0',
  // },
  indicator: {
    backgroundColor: '#006CFF',
    height: '6px',
  },
  row: {
    width: '100%',
    padding: '0 0px',
    margin: '0 auto',
  },

  tab: {
    color: '#006CFF',
    textTransform: 'inherit',
  },

  selectedTab: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
  },
  accordionWrapper: {
    height: '475px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  accordion: {
    boxShadow: 'none',

    '&::before': {
      display: 'none',
    },
  },
  accordionSummary: {
    height: '64px',
  },
  accordionExpanded: {
    background: '#F4F4F4',
  },
  selectedValue: {
    marginLeft: '5px',
    color: '#656565',
  },
  details: {
    height: '53vh',
  },
  detailsShopWrapper: {
    width: '100%',
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0',
  },

  searchContainer: {
    margin: 0,
  },

  searchInput: {
    width: '290px',
    height: '40px',
  },
  tableWrapper: {
    marginTop: '10px',
    height: '350px',
  },
}))

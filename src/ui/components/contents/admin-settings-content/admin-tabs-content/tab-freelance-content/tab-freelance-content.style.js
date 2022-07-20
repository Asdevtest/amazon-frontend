import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // gap: '10px',
  },

  mainTitle: {
    marginBottom: '30px',
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

  textFieldUnSelection: {
    width: '100%',
    minHeight: '40px',
    color: 'rgba(61, 81, 112, 1)',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',

    fontWeight: '400',
    lineHeight: '1.5',

    '& > ::selection': {
      userSelect: 'none',
    },
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

    fontWeight: '400',
    lineHeight: '1.5',
  },

  tabItemWrapper: {
    width: '25%',
  },

  tabItemButton: {
    height: '50px',
    color: '#656565',
    backgroundColor: 'inherit',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    borderRadius: 0,
    marginBottom: '60px',
    width: '100%',
    '&:hover': {
      background: 'linear-gradient(0deg, rgba(0, 108, 255, 0.2) 0%, rgba(0, 108, 255, 0) 100%)',
    },
  },

  tabItemActiveButton: {
    height: '50px',
    color: '#006CFF',
    backgroundColor: 'inherit',
    borderBottom: '1px solid #006CFF',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    borderRadius: 0,
    marginBottom: '60px',
    width: '100%',
    '&:hover': {
      background: 'linear-gradient(0deg, rgba(0, 108, 255, 0.2) 0%, rgba(0, 108, 255, 0) 100%)',
    },
  },

  tabItemNoActiveContent: {
    padding: '0 20px',
    filter: 'blur(2px)',
    opacity: '0.3',
  },

  tabItemActiveContent: {
    padding: '0 20px',
    height: '65vh',
  },

  placeAddBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  submitButton: {
    width: '165px',
    height: '40px',
  },

  tabsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    width: '100%',
  },

  tabsItemWrapper: {
    display: 'flex',
  },

  tabHideDestinationWrapper: {
    width: '25%',
    visibility: 'hidden',
  },

  tabActiveDestinationWrapper: {
    width: '100%',
    visibility: 'visibility',
  },

  hideBlock: {
    display: 'none',
  },

  unselectable: {
    userSelect: 'none',
  },
}))

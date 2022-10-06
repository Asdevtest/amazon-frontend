import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
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
    marginTop: '20px',
    marginBottom: '20px',
  },

  proxyButtonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '20px',
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

  proxyField: {
    display: 'flex',
    alignItems: 'start',
  },

  proxyFieldText: {
    marginBottom: '12px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: '#001029',
  },

  proxyFieldTextUnSelection: {
    marginBottom: '12px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: '#001029',
    userSelect: 'none',
  },

  addProxyButton: {
    // marginTop: '15px',
    marginLeft: '10px',
  },

  textContainer: {
    margin: 0,
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

  unselectable: {
    userSelect: 'none',
  },
  proxyWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '22px',
  },

  proxiesWrapper: {
    height: '100%',
  },

  halfProxiesWrapper: {
    height: '230px',
    overflow: 'hidden',
  },
  proxySubWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  proxy: {
    color: '#006CFF',
    fontSize: '16px',
    lineHeight: '19px',
  },
  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.07)',
    },
  },

  deleteProxy: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.07)',
    },
  },
  tablePanelSortWrapper: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',

    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      opacity: '.8',
    },
  },
  tablePanelViewText: {
    fontSize: '16px',
    lineHeight: '19px',
    color: '#006CFF',

    marginRight: '15px',
  },
  disabledTablePanelSortWrapper: {
    cursor: 'default',
  },
}))

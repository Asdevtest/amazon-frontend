import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '674px',
    maxHeight: '650px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
    [theme.breakpoints.down(768)]: {
      width: '295px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  },

  form: {
    display: 'flex',
    padding: '5px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '10px',
    gap: '10px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
      gap: '10px',
    },
  },

  buttonsSubWrapper: {
    display: 'flex',
    gap: '10px',
  },

  divider: {
    margin: '20px',
  },

  permissionWrapper: {
    display: 'flex',
    alignItems: 'center',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    marginBottom: 15,
    borderBottom: '1px solid rgba(0,0,0, .2)',
    '&:hover': {
      transform: 'translate(0%, -3%)',
    },
  },

  button: {
    width: '152px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '144px',
      height: '40px',
    },
  },
  cancelBtn: {
    color: theme.palette.text.general,
  },

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
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '280px',
      height: 'auto',
      overflow: 'auto',
    },
  },

  permissionGroupsToSelectItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'start',
    },
  },

  permissionGroupsToSelectItem: {
    width: '100%',
    display: 'flex',
    padding: '5px',
    border: '1px solid rgba(0,0,0, .3)',
    borderRadius: '10px',
    marginBottom: '4px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.01)',
    },

    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      border: 'none',
      margin: 0,
    },
  },

  standartText: {
    color: theme.palette.text.general,
  },

  rightSideTitle: {
    color: theme.palette.text.general,
  },

  permissionGroupsToSelectCheckboxWrapper: {
    border: '1px solid rgba(0,0,0, .1)',
    borderRadius: '10px',
    margin: '0 0 4px 10px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.01)',
    },
    [theme.breakpoints.down(768)]: {
      margin: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30px',
      height: '30px',
      transition: '0.3s ease',
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
      '&:hover': {
        transform: 'scale(1.01)',
      },
    },
  },

  selectedItem: {
    border: `1px solid ${theme.palette.primary.main}`,
  },

  keyPermission: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  tabWillBeOpened: {
    backgroundColor: 'rgba(0,123,255, 0.4)',
    [theme.breakpoints.down(768)]: {
      borderRadius: '50%',
    },
  },

  indicator: {
    backgroundColor: theme.palette.background.darkBlue,
    height: '6px',
    [theme.breakpoints.down(768)]: {
      height: '0',
    },
  },
  row: {
    width: '100%',
    padding: '0 0px',
    margin: '0 auto',
  },

  tab: {
    color: theme.palette.primary.main,
    textTransform: 'inherit',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  selectedTab: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    [theme.breakpoints.down(768)]: {
      background: 'none',
      fontSize: '16px',
      color: theme.palette.text.general,
      fontWeight: 600,
    },
  },
  accordionWrapper: {
    height: '475px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  accardionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: '0 16px',
  },

  title: {
    fontWeight: 600,

    color: theme.palette.text.general,
  },

  permGroupWrapper: {
    [theme.breakpoints.down(768)]: {
      border: `1px solid ${theme.palette.input.customBorder}`,
      width: '280px',
      borderRadius: '4px',
      marginBottom: '20px',
    },
  },
  permissionGroupsToSelectItemSubWrapper: {
    [theme.breakpoints.down(768)]: {
      width: '280px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
    },
  },
  iconWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  requestTypeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',

    p: {
      fontSize: '14px',
      fontWeight: 400,
      color: theme.palette.text.second,
    },
  },

  requestTypeField: {
    width: '312px',
    height: 40,
    margin: 0,
    paddingLeft: 10,

    borderRadius: 4,

    '&:before': {
      borderBottom: 'none',
    },
  },

  currentUserBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
}))

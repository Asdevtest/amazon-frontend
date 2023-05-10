import {keyframes} from '@emotion/react'

const ani = keyframes`
  0% {
    transform: translateY(-150%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
`

export const styles = theme => ({
  cardWidthTest: {
    width: '200px',
  },
  mainTitle: {
    marginTop: '24px',
  },
  addProductBtnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnsWrapper: {
    display: 'flex',

    '& > :not(:first-of-type)': {
      marginLeft: '30px',
    },
  },

  archiveBtnsWrapper: {
    display: 'flex',

    gap: '30px',
  },

  archiveAddBtn: {
    width: 230,
    border: '1px solid #FF1616',
    color: '#FF1616',

    '&:hover': {
      border: '1px solid #FF1616',
      opacity: 0.6,
    },

    '&:disabled': {
      borderColor: '#FEB9B9',
      color: '#FEB9B9',
    },
  },

  archiveRecoverBtn: {
    border: '1px solid #009a07',
    color: '#009a07',

    '&:hover': {
      border: '1px solid #009a07',
      opacity: 0.6,
    },
  },

  // row: {

  //   cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
  //   transition: '0.3s ease',
  //   '&:hover': {
  //     transform: 'scale(1.01)',
  //     // posotion: 'relative',
  //   },

  //   border: 0,
  //   // boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
  //   backgroundColor: theme.palette.background.general,

  //   posotion: 'relative',

  //   // '&::after': {
  //   //   content: '""',
  //   // },
  // },
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  archiveIcon: {
    marginLeft: '10px',
  },

  openArchiveBtn: {
    width: 230,
    padding: '0 30px 0 30px',

    color: theme.palette.primary.main,
  },

  button: {
    marginBottom: 5,

    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  selectedShopsBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: theme.palette.other.tableActiveFilterBtn,
  },

  shopsFiltersWrapper: {
    display: 'flex',
    gap: 30,
    marginBottom: 20,
  },

  icon: {
    // marginLeft: '15px',
    position: 'absolute',
    top: '11px',
    right: '25px',

    width: 15,
    height: 15,
  },

  simpleBtnsWrapper: {
    display: 'flex',
    gap: '30px',
    paddingRight: '5px',
  },

  topHeaderBtnsWrapper: {
    // paddingTop: 5,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  rightAddingBtn: {
    width: 282,
    // width: 300,

    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    paddingRight: '40px',
    // justifyContent: 'flex-start',

    // textAlign: 'left',
  },

  flexCenterBtn: {
    justifyContent: 'center',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
  },

  searchContainer: {
    width: 'auto',
    justifySelf: 'flex-start',
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '79vh',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

    backgroundColor: theme.palette.background.general,
  },

  clickableCell: {
    transition: '.3s ease',

    '&:hover': {
      borderRadius: 10,
      boxShadow: 'inset 0 0 10px rgba(247, 179, 7, .8)',
      transform: 'scale(0.98)',
    },
  },

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
  },
  acceptMessageWrapper: {
    position: 'absolute',
    top: 0,
    // top: '50%',
    left: '50%',

    padding: '10px',
    marginTop: '63px',
    zIndex: 999,
    opacity: 0,
    transform: 'translateY(-150%)',
    animation: `${ani} 1s forwards`,
  },
  columnHeaderDraggableContainer: {
    flexDirection: 'row !important',

    position: 'relative',
    paddingRight: 20,
  },
  columnHeaderTitleContainer: {
    flexDirection: 'row !important',
    display: 'flex !important',
    alignItems: 'center !important',
  },
  menuIconButton: {
    zIndex: 1000,
    position: 'absolute !important',
    right: -7,
    top: 13,
    visibility: 'visible !important',

    width: '18px !important',
    height: '18px !important',

    '.MuiSvgIcon-root': {
      display: 'none',
    },
  },
  iconButtonContainer: {
    '.MuiIconButton-root': {
      width: '18px !important',
      height: '18px !important',
    },
  },
  iconSeparator: {
    padding: '0 1px',
  },

  // ideaRow: {
  //   '&:before': {
  //     content: '"idea"',
  //     // display: 'flex',
  //     display: 'inline-block',
  //     // verticalAlign: 'middle',
  //     // marginleft: 100,
  //     // alignItems: 'flex-end',
  //     // gap: 10,
  //     // // padding: 2,
  //     color: theme.palette.primary.main,
  //     fontSize: 18,
  //     fontWeight: 600,
  //     // width: 80,
  //     // height: 0,
  //     // textAlign: 'right',
  //     // whiteSpace: 'nowrap',
  //     // writingMode: 'horizontal-tb',
  //     // // height: 20,
  //     // position: 'absolute',
  //     // top: 0,
  //     // left: 0,

  //     width: 80,
  //     height: 0,
  //     borderTop: `20px solid ${theme.palette.primary.main}`,
  //     borderRight: '20px solid transparent',
  //     posotion: 'relative',
  //   },
  // },

  ideaRow: {
    '&:before': {
      content: '""',

      backgroundImage: theme.palette.other.ideaProductSheld,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },

  blueButton: {
    '&:disabled': {
      background: '#B3D1FB',
      color: '#F9FCFF',
    },
  },

  // ideaRow: {
  //   '&:before': {
  //     content: '"idea"',
  //     display: 'flex',

  //     alignItems: 'flex-end',
  //     color: theme.palette.primary.main,
  //     fontSize: 18,
  //     fontWeight: 600,

  //     width: 0,
  //     height: 80,
  //     borderTop: `20px solid ${theme.palette.primary.main}`,
  //     borderRight: '20px solid transparent',
  //     posotion: 'relative',
  //   },
  // },
})

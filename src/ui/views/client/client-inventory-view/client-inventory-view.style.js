import { keyframes } from '@emotion/react'

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
    height: 40,

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

  shopsFiltersWrapper: {
    display: 'flex',
    gap: 30,
    marginBottom: 20,
  },

  icon: {
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

  btnWrapperStyle: {
    height: 40,
  },

  topHeaderBtnsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  rightAddingBtn: {
    width: 282,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    paddingRight: '40px',
  },

  flexCenterBtn: {
    justifyContent: 'center',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
  },

  datagridWrapper: {
    marginTop: '10px',
    height: '79vh',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
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
    overflow: 'visible',
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

  ideaRowGreen: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldGreen,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },

  ideaRowYellow: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldYellow,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },
})

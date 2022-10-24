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

    '& > :not(:first-child)': {
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
  },

  archiveRecoverBtn: {
    border: '1px solid #009a07',
    color: '#009a07',

    '&:hover': {
      border: '1px solid #009a07',
      opacity: 0.6,
    },
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },

    border: 0,
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: theme.palette.background.main,
  },

  archiveIcon: {
    marginLeft: '10px',
  },

  openArchiveBtn: {
    width: 230,
    padding: '0 30px 0 30px',

    color: theme.palette.text.general,
  },

  button: {
    marginBottom: 5,

    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  selectedShopsBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
  },

  shopsFiltersWrapper: {
    display: 'flex',
    gap: 30,
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
    border: '1px solid #007bff',
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
    // backgroundColor: theme.palette.background.main,

    backgroundColor: theme.palette.background.main,
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
})

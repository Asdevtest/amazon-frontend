export const styles = theme => ({
  addProductBtnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  btnsWrapper: {
    display: 'flex',

    '& > :not(:first-of-type)': {
      marginLeft: '30px',
    },
  },

  archiveAddBtn: {
    width: 230,
    display: 'flex',
    gap: 10,
    border: `1px solid ${theme.palette.other.rejected}`,
    color: theme.palette.other.rejected,
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      border: `1px solid ${theme.palette.other.rejected}`,
      opacity: 0.6,
    },

    '&:disabled': {
      borderColor: '#FEB9B9',
      color: '#FEB9B9',
    },

    '&.Mui-disabled': {
      background: 'none',
    },
  },

  openArchiveBtn: {
    width: 230,
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
    width: 16,
    height: 16,
  },

  simpleBtnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    paddingRight: '5px',
  },

  btnWrapperStyle: {
    height: 40,
  },

  topHeaderBtnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
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
    width: '330px',
    height: 36,
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '75vh',
  },

  clickableCell: {
    transition: '.3s ease',

    '&:hover': {
      borderRadius: 10,
      boxShadow: 'inset 0 0 10px rgba(247, 179, 7, .8)',
      transform: 'scale(0.98)',
    },
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

  actionButtonWithPlus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '9px',
    minWidth: '180px !important',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  modalDialogContext: {
    padding: 0,
  },
})

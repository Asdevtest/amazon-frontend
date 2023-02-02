export const styles = theme => ({
  sendOwnProductBtn: {
    marginBottom: theme.spacing(2),
  },
  redistributionWrapper: {},
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalMessage: {
    maxWidth: '400px',
  },
  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  addProductBtnWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '0 0 10px',
  },

  tableWrapper: {
    marginTop: '32px',
    width: '100%',
    height: '100%',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 0',
    paddingRight: '5px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '15px 0',
      gap: 15,
      '& > :nth-of-type(1)': {
        order: 0,
      },
      '&> :nth-of-type(2)': {
        order: 2,
      },
      '&> :nth-of-type(3)': {
        order: 1,
      },
    },
  },

  leftBtnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    [theme.breakpoints.down(768)]: {
      gap: '15px',
    },
  },

  editBtn: {
    width: '260px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },
  batchBtn: {
    width: '260px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },
  createBtn: {
    width: '200px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  addBtn: {
    height: '36.5px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

    backgroundColor: theme.palette.background.general,
  },

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,

    borderTop: 'none !important',
    [theme.breakpoints.down(768)]: {
      '& > :nth-of-type(2) > :nth-of-type(1) > :nth-of-type(3)': {
        display: 'none',
      },
      '& > :nth-of-type(2) > :nth-of-type(1) > :nth-of-type(5)': {
        marginLeft: '2px',
      },
    },
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      height: '100px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',

      alignItems: 'start',

      marginTop: '40px',

      '& > button': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center !important',

        fontSize: '12px',
      },
      '& > button > span': {
        marginRight: 0,
      },
    },
  },

  filterForm: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',

      '& > div': {
        width: '100%',
      },
    },
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '75vh',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down(768)]: {
      margin: 0,
    },
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: '38px',
    fontSize: '16px',
    paddingLeft: '7px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },
})

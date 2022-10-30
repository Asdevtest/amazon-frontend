export const styles = theme => ({
  test: {
    padding: theme.spacing(7),
  },
  buttonBox: {
    textAlign: 'right',
    marginRight: '0',
    padding: '16px',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '290px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  searchContainer: {
    marginTop: 0,
    width: 'auto',
    marginRight: 'calc(50% - 345px)',
    [theme.breakpoints.down(768)]: {
      marginTop: 0,
      width: '100%',
      marginRight: 0,
    },
  },

  actionsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  subUserHeader: {
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexDirection: 'column',
    },
  },

  addUserButton: {
    width: '200px',
    height: '40px',
    display: 'flex',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '80vh',
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
    [theme.breakpoints.down(768)]: {
      '& > :nth-child(2) > :nth-child(1) > :nth-child(3)': {
        display: 'none',
      },
      '& > :nth-child(2) > :nth-child(1) > :nth-child(5)': {
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
  buttonWrapper: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
})

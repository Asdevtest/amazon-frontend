export const styles = theme => ({
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '290px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,

    height: '40px',

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

  buttonWrapper: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
})

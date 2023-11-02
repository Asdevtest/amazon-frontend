export const styles = theme => ({
  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingRight: '5px',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column-reverse',
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
    gap: 25,

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
    display: 'flex',
    alignItems: 'center',
    padding: '8px 20px 8px 15px',
    gap: 10,

    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
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
  datagridWrapper: {
    marginTop: '20px',
    height: '80vh',
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

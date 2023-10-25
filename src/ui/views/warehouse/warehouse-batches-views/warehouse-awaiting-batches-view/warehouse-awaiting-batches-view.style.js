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

  datagridWrapper: {
    marginTop: '20px',
    height: '80vh',
    width: '100%',
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

export const styles = theme => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },
  button: {
    marginRight: '24px',
  },
  buttonsWrapper: {
    textAlign: 'right',
  },
  tableWrapper: {
    marginTop: '24px',
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
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '81vh',
  },

  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },
  btnsWrapper: {
    width: '100%',

    margin: '10px 0 15px',
    display: 'flex',

    justifyContent: 'space-around',
  },
  openArchiveBtn: {
    width: 230,
    padding: '0 30px 0 30px',

    color: theme.palette.text.general,
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
  simpleBtnsWrapper: {
    display: 'flex',
    gap: '30px',
    paddingRight: '5px',
  },
})

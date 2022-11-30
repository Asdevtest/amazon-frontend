export const styles = theme => ({
  balanceTitle: {
    color: theme.palette.text.general,
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
    marginBottom: '24px',
  },
  mb5: {
    marginBottom: theme.spacing(5),
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.005)',
    },
  },
  topHeaderBtnsWrapper: {
    paddingTop: 5,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: {
    border: '1px solid #007bff',
    width: '400px',
    height: 36,
    overflow: 'visible',
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

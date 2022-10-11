export const styles = theme => ({
  tableWrapper: {
    marginTop: '32px',
    width: '100%',
    height: '100%',
  },
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '250px',

    padding: 0,
    border: 'none',
  },
  buttonsWrapper: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: '10px',
  },

  rowCancelBtn: {
    marginLeft: '10px',
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

  '@media (max-width: 768px)': {
    toolbarContainer: {
      visibility: 'hidden',
    },
  },
})

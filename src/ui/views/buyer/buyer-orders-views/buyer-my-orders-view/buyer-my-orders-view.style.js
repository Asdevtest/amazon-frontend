export const styles = theme => ({
  buttonWrapper: {
    padding: '16px',
    textAlign: 'right',
    marginRight: '0px',
    borderTop: '1px solid rgb(224,224,224)',
  },
  tableWrapper: {
    marginTop: '32px',
    minWidth: '100%',
    height: '100%',
  },
  dialogContextClassName: {
    width: '1200px',
  },
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  attentionRow: {
    boxShadow: 'inset 0 0 30px rgba(247, 179, 7,1)',
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

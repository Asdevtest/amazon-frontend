export const styles = theme => ({
  buttonBox: {
    textAlign: 'left',
    marginRight: '0',
    padding: '16px 0',
    display: 'flex',
    gap: 30,
  },

  shopsSelect: {
    marginLeft: 'auto',
  },

  datagridWrapper: {
    marginTop: '10px',
    height: '74vh',
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
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
  },

  filterBtn: {
    marginBottom: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    height: 'auto !important',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  fieldNamesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 'max-content',
    justifyContent: 'space-between',
    width: '100%',
  },

  fieldNamesWrapperWithCheckbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  fieldName: {
    height: 20,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: theme.palette.primary.main,
  },
})

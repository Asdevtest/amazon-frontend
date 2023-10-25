export const styles = theme => ({
  buttonBox: {
    textAlign: 'left',
    marginRight: '0',
    marginTop: 10,
    display: 'flex',
    gap: 30,
  },

  shopsSelect: {
    marginLeft: 'auto',
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '74vh',
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
    color: theme.palette.text.general,
  },
})

export const styles = theme => ({
  button: {
    padding: '0 45px',
    height: 'auto',
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 600,

    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },

  tasksWrapper: {
    marginTop: 20,
    height: 'calc(100vh - 250px)',
  },

  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 405,
    height: 36,
    fontSize: '16px',
    paddingLeft: '7px',
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

  filters: {
    display: 'flex',
    gap: 50,
    flexWrap: 'wrap',
  },

  pickupOrdersButton: {
    padding: '0 20px',
    height: 40,
    color: '#fff',
    display: 'flex',
    gap: 10,
  },

  downloadIcon: {
    color: '#fff',
  },

  disabledDownloadIcon: {
    color: theme.palette.button.disabledText,
  },

  controls: {
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
  },
})

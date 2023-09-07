export const styles = theme => ({
  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftBtnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },

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

  isDraftRow: {
    opacity: '.5',
  },

  tasksWrapper: {
    marginTop: 20,
  },

  boxesFiltersWrapper: {
    marginBottom: '15px',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',
    borderBottom: theme.palette.other.tableActiveFilterBtn,
    color: `${theme.palette.primary.main} !important`,
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  virtualScrollerContent: {
    maxHeight: '69vh',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
    height: 36,
  },

  topHeaderBtnsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
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
})

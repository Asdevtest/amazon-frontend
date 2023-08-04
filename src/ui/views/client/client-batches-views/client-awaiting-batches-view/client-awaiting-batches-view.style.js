export const styles = theme => ({
  button: {
    marginRight: '24px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  btnsWrapper: {
    width: '100%',

    margin: '10px 0 15px',
    display: 'flex',

    alignItems: 'end',
    justifyContent: 'space-between',
  },

  btnsSubWrapper: {
    display: 'flex',
    gap: 30,
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

  datagridWrapper: {
    marginTop: '20px',
    height: '74vh',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: '38px',
    fontSize: '16px',
    paddingLeft: '7px',
  },

  cancelBtn: {
    whiteSpace: 'nowrap',
  },

  boxesFiltersWrapper: {
    marginTop: '5px',
    marginBottom: '10px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',
    borderBottom: theme.palette.other.tableActiveFilterBtn,
    color: `${theme.palette.primary.main} !important`,
  },

  storekeeperButton: {
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

  rightSideWrapper: {
    display: 'flex',
    alignItems: 'end',

    gap: 30,
  },

  rightSideButtonsWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: 10,
  },

  rightSideButton: {
    width: 209,
  },
})

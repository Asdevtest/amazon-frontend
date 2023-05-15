export const styles = theme => ({
  sendOwnProductBtn: {
    marginBottom: theme.spacing(2),
  },
  redistributionWrapper: {},
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalMessage: {
    maxWidth: '400px',
  },
  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 0 10px',
    marginTop: 10,
  },
  leftBtnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },

  productFilterWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 50,
  },

  productFilterText: {
    fontSize: 22,
    fontWeight: 600,
    color: 'rgba(247, 179, 7, .8)',
    letterSpacing: 5,
  },

  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '250px',

    padding: 0,
  },
  buttonsWrapper: {
    marginTop: '15px',
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
    marginTop: '30px',

    // height: 'calc(100vh - 380px)',
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

    borderBottom: '5px solid #0460DE',

    color: `${theme.palette.primary.main} !important`,
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  dataGridWrapper: {
    height: '73vh',
    overflow: 'auto',
  },

  virtualScrollerContent: {
    maxHeight: '69vh',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
    height: 36,
  },

  searchContainer: {
    width: 'auto',
  },

  topHeaderBtnsWrapper: {
    paddingTop: 5,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitleWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '40px',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '40px',
    fontWeight: '600',
    color: theme.palette.text.general,
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

    backgroundColor: theme.palette.background.general,
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '79vh',
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

  columnHeaderDraggableContainer: {
    flexDirection: 'row !important',

    position: 'relative',
    paddingRight: 20,
  },
  columnHeaderTitleContainer: {
    flexDirection: 'row !important',
    display: 'flex !important',
    alignItems: 'center !important',
  },
  menuIconButton: {
    zIndex: 1000,
    position: 'absolute !important',
    right: -7,
    top: 13,
    visibility: 'visible !important',

    width: '18px !important',
    height: '18px !important',

    '.MuiSvgIcon-root': {
      display: 'none',
    },
  },
  iconSeparator: {
    padding: '0 1px',
  },

  tableWrapper: {
    height: 'calc(100vh - 310px)',
    width: '100%',
  },
})

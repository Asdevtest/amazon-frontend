export const styles = theme => ({
  dataGridWrapper: {
    height: 'calc(100vh - 200px)',
  },

  taskTypeWrapper: {
    display: 'flex',
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

  columnHeaderDraggableContainer: {
    flexDirection: 'row !important',
  },
  columnHeaderTitleContainer: {
    flexDirection: 'row !important',
    display: 'flex !important',
    alignItems: 'center !important',
    overflow: 'visible',
  },

  iconSeparator: {
    padding: '0 1px',
  },

  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },

  dashboardCardWrapper: {
    width: '100%',
    gap: 35,
  },

  tablePanelViewWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      opacity: '.8',
    },
  },

  tablePanelViewText: {
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
    marginRight: '15px',
  },

  emptyTableWrapper: {
    width: '100%',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTableText: {
    marginTop: '30px',
    color: theme.palette.text.second,
  },

  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
  },

  viewCart: {
    width: '20px !important',
    height: '20px !important',
    color: theme.palette.text.second,
  },

  viewCartSelected: {
    color: theme.palette.primary.main,
  },

  button: {
    padding: '0 15px',
    height: 40,
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 600,
    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',
    borderBottom: theme.palette.other.tableActiveFilterBtn,
    color: `${theme.palette.primary.main} !important`,
  },

  tablePanelSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  yellowBorder: {
    background:
      'linear-gradient(180deg, rgba(243, 175, 0, 0.5) 0%, rgba(234, 169, 1, 0) 17.27%, rgba(227, 164, 3, 0) 84.43%, rgba(224, 162, 3, 0.5) 100%)',
  },
  redBorder: {
    background:
      'linear-gradient(180deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 18.05%, rgba(243, 0, 0, 0) 83.72%, rgba(243, 0, 0, 0.5) 100%)',
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

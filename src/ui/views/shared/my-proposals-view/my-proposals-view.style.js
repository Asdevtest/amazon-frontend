export const styles = theme => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },

  taskTypeWrapper: {
    display: 'flex',
  },

  btnWrapperStyle: {
    width: 'fit-content',
  },

  row: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  dashboardCardWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    marginTop: 30,
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
  },
  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
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
  searchInput: {
    width: 320,
  },

  tablePanelSubWrapper: {
    display: 'flex',
  },

  proposalSelect: {
    marginLeft: 30,
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

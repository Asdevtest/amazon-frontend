/* eslint-disable no-unused-vars */
export const styles = theme => ({
  toggleBtnAndtaskTypeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },
  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: '20px',
  },
  tablePanelViewWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  viewCart: {
    width: '20px !important',
    height: '20px !important',

    color: theme.palette.text.second,
  },
  viewCartSelected: {
    color: theme.palette.primary.main,
  },
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 420,
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

  btnWrapperStyle: {
    width: 'fit-content',
    margin: 0,
    padding: 0,
  },

  dashboardCardWrapper: {
    display: 'grid',
    gap: '20px',
    '& > div': {
      margin: '0 auto',
      width: '100%',
    },
  },
})

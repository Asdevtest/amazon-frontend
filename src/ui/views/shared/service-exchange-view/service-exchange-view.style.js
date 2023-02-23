/* eslint-disable no-unused-vars */
export const styles = theme => ({
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
    width: '400px',
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
})

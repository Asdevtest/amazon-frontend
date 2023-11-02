/* eslint-disable no-unused-vars */

export const styles = theme => ({
  dataGridWrapper: {
    marginTop: 20,
    height: '80vh',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
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

  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

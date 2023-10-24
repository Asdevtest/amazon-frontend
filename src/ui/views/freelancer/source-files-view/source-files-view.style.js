export const styles = theme => ({
  dataGridWrapper: {
    marginTop: 20,
    height: '80vh',
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

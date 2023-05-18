export const styles = theme => ({
  dealsOnReviewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 52,
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

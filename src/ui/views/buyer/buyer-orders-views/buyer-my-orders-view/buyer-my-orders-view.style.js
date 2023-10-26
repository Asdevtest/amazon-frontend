export const styles = theme => ({
  dialogContextClassName: {
    width: '1200px',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerWrapperCenter: {
    display: 'flex',
    justifyContent: 'center',
  },

  attentionRow: {
    boxShadow: 'inset 0 0 30px rgba(247, 179, 7, .3)',
  },

  dataGridWrapper: {
    height: '82vh',
    width: '100%',
  },

  totalPriceWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 320,
    gap: 5,
  },

  totalPriceText: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    whiteSpace: 'nowrap',
    color: theme.palette.text.second,
  },

  totalPrice: {
    color: theme.palette.primary.main,
  },

  totalPriceTextWrapper: {
    display: 'flex',
  },

  loadingCircle: {
    zIndex: 10000,
  },
})

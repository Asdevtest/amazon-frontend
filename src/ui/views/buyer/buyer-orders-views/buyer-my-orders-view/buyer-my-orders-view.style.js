export const styles = theme => ({
  buttonWrapper: {
    padding: '16px',
    textAlign: 'right',
    marginRight: '0px',
    borderTop: '1px solid rgb(224,224,224)',
  },
  tableWrapper: {
    marginTop: '32px',
    minWidth: '100%',
    height: '100%',
  },
  dialogContextClassName: {
    width: '1200px',
  },
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
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
  datagridWrapper: {
    marginTop: '10px',
    height: '79vh',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

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

  dataGridWrapper: {
    height: '84vh',
  },

  totalPriceWrapper: {
    display: 'flex',
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
})

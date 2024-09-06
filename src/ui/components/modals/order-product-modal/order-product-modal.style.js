import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '24px',
  },

  pendingOrderWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    cursor: 'pointer',
  },

  checkbox: {
    padding: 0,
  },

  table: {
    '& td': {
      flexShrink: 0,
      color: '#070707',
    },
    '& th': {
      color: theme.palette.text.general,
      fontWeight: 600,
      lineHeight: '16px',
      fontSize: '14px',
      height: '32px',
    },

    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },

  tableWrapper: {
    width: '100%',
    borderRadius: 20,
    background: theme.palette.background.general,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 3px 1px, rgba(0, 0, 0, 0.3) 0px 1px 2px 0px',
  },

  productCell: {
    width: 250,
    padding: '0 20px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  priceCell: {
    width: 50,
    padding: '0 10px',
    borderRight: '1px solid #e0e0e0',
  },

  tableRow: {
    height: 90,
  },

  priceCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'inherit !important',
    },

    '&:disabled': {
      backgroundColor: 'inherit !important',
      color: theme.palette.text.general,
    },
  },

  deliveryCell: {
    width: 50,
    padding: '0 10px',
    borderRight: '1px solid #e0e0e0',
    textAlign: 'center',
    margin: 0,
  },

  deliveryCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit !important',
    },

    '&:disabled': {
      backgroundColor: 'inherit !important',
      color: theme.palette.text.general,
    },
  },

  qntCell: {
    width: 150,
    padding: '0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  qntCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit !important',
    },

    '&:disabled': {
      backgroundColor: 'inherit !important',
      color: theme.palette.text.general,
    },
  },

  totalCell: {
    maxWidth: 135,
    minWidth: 135,
    padding: '0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  totalCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'inherit !important',
    },

    '&:disabled': {
      backgroundColor: 'inherit !important',
      color: theme.palette.text.general,
    },
  },

  barCodeCell: {
    width: 90,
    padding: '0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  barCodeCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit !important',
    },

    '&:disabled': {
      backgroundColor: 'inherit !important',
      color: theme.palette.text.general,
    },
  },

  warehouseCell: {
    width: 120,
    padding: '0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  warehouseCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit !important',
    },

    '&:disabled': {
      backgroundColor: 'inherit !important',
      color: theme.palette.text.general,
    },
  },

  tariffCell: {
    width: 140,
    padding: '0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  tariffCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'inherit !important',
    },
    '&:disabled': {
      backgroundColor: 'inherit !important',
      color: theme.palette.text.general,
    },
  },

  commentCell: {
    width: 230,
    padding: '0 10px',
    borderRight: '1px solid #e0e0e0',

    margin: 0,
  },

  deadlineCell: {
    width: 180,
    padding: '0 10px',

    margin: 0,
  },

  cellText: {
    fontSize: 16,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  commentCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'inherit !important',
    },
    '&:disabled': {
      backgroundColor: 'inherit !important',
      color: theme.palette.text.general,
    },
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 50,
    margin: '20px 15px 5px 0px',
  },

  sumWrapper: {
    textAlign: 'right',
    paddingTop: 10,
  },

  sumText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },
  tooltipPositionStyle: {
    position: 'absolute',
    right: '-10px',
    bottom: '10px',
  },
  attentionTooltip: {
    width: '18px !important',
    height: '18px !important',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
  },

  modalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '24px',
  },

  pendingOrderWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    cursor: 'pointer',
  },

  checkbox: {
    padding: 0,
  },

  modalButton: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
  },

  table: {
    '& td': {
      flexShrink: 0,
      color: '#070707',
    },
    '& th': {
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
    },
  },

  qntCell: {
    width: 50,
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
    },
  },

  commentCell: {
    width: 250,
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
    },
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 50,
    margin: '30px 15px 5px 0',
  },
  buyNowBtn: {
    color: '#fff',
  },
  cancelBtn: {
    backgroundColor: 'inherit !important',

    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#e4e4e4',
    },
  },

  sumWrapper: {
    textAlign: 'right',
  },

  sumText: {
    fontSize: 14,
    lineHeight: '19px',
  },
}))

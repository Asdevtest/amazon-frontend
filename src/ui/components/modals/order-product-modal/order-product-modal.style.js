import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalTitle: {
    color: theme.palette.text.general,
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
    // backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
  },

  table: {
    '& td': {
      flexShrink: 0,
      color: '#070707',
      // border: '1px solid #fff',
    },
    '& th': {
      color: theme.palette.text.general,
      fontWeight: 600,
      lineHeight: '16px',
      fontSize: '14px',
      // borderBottom: '1px solid #fff',
      height: '32px',
    },

    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },

  tableWrapper: {
    margin: '0px -30px',
    width: 'auto',
    overflow: 'hidden',
  },
  imgCell: {
    width: '96px',
    padding: '0 46px 0 20px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
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
    width: 80,
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
    marginTop: 30,
  },
  buyNowBtn: {
    color: '#fff',
  },
  cancelBtn: {
    backgroundColor: 'inherit !important',
    color: theme.palette.text.general,
    textTransform: 'none',
    '&:hover': {
      color: theme.palette.text.general,
      backgroundColor: '#e4e4e4',
    },
  },

  sumWrapper: {
    textAlign: 'right',
  },

  sumText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },
}))

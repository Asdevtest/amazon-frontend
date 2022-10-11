import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '24px',
  },
  modalSubTitle: {
    color: theme.palette.text.general,
    fontSize: '13px',
    fontWeight: 700,
    lineHeight: '15px',
    marginBottom: '8px',
  },
  modalText: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  inputWrapper: {
    marginBottom: '16px',
  },
  input: {
    width: '100%',
  },
  inputLabel: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginBottom: '8px',
  },

  modalButton: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
  },
  footerTitle: {
    color: 'rgba(189, 194, 209, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    flexGrow: 1,
  },
  imgBox: {
    backgroundColor: 'rgba(196, 196, 196, 1)',
    height: '64px',
    width: '64px',
    borderRadius: '3px',
    textAlign: 'center',
    position: 'relative',
    margin: '12px',
  },
  imgCross: {
    color: '#fff',
    fontSize: '68px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -59%)',
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
  tableCell: {
    align: 'center',
    maxWidth: '100px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },
  // divider: {
  //   margin: '0px -24px',
  // },
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
    width: '368px',
    padding: '0 200px 0 20px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  priceCell: {
    width: '140px',
    padding: '0 10px 0 10px',
    borderRight: '1px solid #e0e0e0',
  },

  priceCellBtn: {
    width: '140px',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '&:disabled': {
      backgroundColor: 'inherit',
      color: theme.palette.text.general,
    },
  },

  deliveryCell: {
    width: '170px',
    padding: '0 10px 0 10px',
    borderRight: '1px solid #e0e0e0',

    textAlign: 'center',
    margin: 0,
  },

  deliveryCellBtn: {
    width: '170px',

    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '&:disabled': {
      backgroundColor: 'inherit',
      color: theme.palette.text.general,
    },
  },

  qntCell: {
    padding: '0 10px 0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  qntCellBtn: {
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '&:disabled': {
      backgroundColor: 'inherit',
      color: theme.palette.text.general,
    },
  },

  totalCell: {
    width: '100px',
    padding: '0 10px 0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  totalCellBtn: {
    width: '100px',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '&:disabled': {
      backgroundColor: 'inherit',
      color: theme.palette.text.general,
    },
  },

  barCodeCell: {
    padding: '0 10px 0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  barCodeCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '&:disabled': {
      backgroundColor: 'inherit',
      color: theme.palette.text.general,
    },
  },

  warehouseCell: {
    padding: '0 10px 0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  warehouseCellBtn: {
    width: '100%',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '&:disabled': {
      backgroundColor: 'inherit',
      color: theme.palette.text.general,
    },
  },

  tariffCell: {
    width: '170px',
    padding: '0 10px 0 10px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  tariffCellBtn: {
    width: '180px',
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '&:disabled': {
      backgroundColor: 'inherit',
      color: theme.palette.text.general,
    },
  },

  commentCell: {
    width: '310px',

    margin: 0,
  },

  commentCellBtn: {
    cursor: 'auto',
    border: 'none',
    borderRadius: 0,

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '&:disabled': {
      backgroundColor: 'inherit',
      color: theme.palette.text.general,
    },
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    textAlign: 'right',
    gap: '10px',
    marginTop: '30px',
  },
  buyNowBtn: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
  },
  cancelBtn: {
    backgroundColor: 'inherit',
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
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.text.general,
    marginTop: '10px',
  },
}))

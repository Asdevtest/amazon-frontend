import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: '#001029',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '24px',
  },
  modalSubTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '13px',
    fontWeight: 700,
    lineHeight: '15px',
    marginBottom: '8px',
  },
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
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
    color: 'rgba(61, 81, 112, 1)',
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
      color: '#001029',
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
      color: '#001029',
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
      color: '#001029',
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
      color: '#001029',
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
      color: '#001029',
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
      color: '#001029',
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
      color: '#001029',
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
      color: '#001029',
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
      color: '#001029',
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
    color: '#001029',
    textTransform: 'none',
    '&:hover': {
      color: '#001029',
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
    color: '#001029',
    marginTop: '10px',
  },
}))

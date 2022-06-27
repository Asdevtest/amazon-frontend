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
    padding: '0 20px 0 20px',
    borderRight: '1px solid #e0e0e0',
  },

  deliveryCell: {
    width: '170px',
    padding: '0 20px 0 20px',
    borderRight: '1px solid #e0e0e0',

    textAlign: 'center',
    margin: 0,
  },

  qntCell: {
    padding: '0 38px 0 20px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  totalCell: {
    padding: '0 20px 0 20px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  barCodeCell: {
    width: '173px',
    padding: '0 65px 0 20px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  warehouseCell: {
    width: '158px',
    padding: '0 63px 0 20px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  tariffCell: {
    width: '170px',
    padding: '0 7px 0 20px',
    borderRight: '1px solid #e0e0e0',
    margin: 0,
  },

  commentCell: {
    width: '310px',

    margin: 0,
  },

  buttonsWrapper: {
    textAlign: 'right',
    marginTop: '30px',
  },
  buyNowBtn: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    marginRight: '8px',
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

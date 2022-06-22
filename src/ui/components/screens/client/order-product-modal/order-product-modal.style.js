import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: '#001029',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140:',
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
      color: 'rgba(61, 81, 112, 1)',
      borderBottom: 'none',
    },
    '& th': {
      color: '#001029',
      fontWeight: 600,
      lineHeight: '16px',
      fontSize: '14px',
      // padding: '8px 0',
    },

    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  tableCell: {
    align: 'center',
    maxWidth: '100px',
    borderRight: '1px solid #e0e0e0',
  },
  // divider: {
  //   margin: '0px -24px',
  // },
  tableWrapper: {
    margin: '0px -24px',
    width: 'auto',
    padding: '20px',
  },
  imgCell: {
    padding: '8px 46px 8px 0',
    borderRight: '1px solid #e0e0e0',
  },

  productCell: {
    padding: '8px 280px 8px 20px',
    borderRight: '1px solid #e0e0e0',
  },

  priceCell: {
    padding: '8px 20px 8px 20px',
    borderRight: '1px solid #e0e0e0',
  },

  deliveryCell: {
    padding: '8px 20px 8px 20px',
    borderRight: '1px solid #e0e0e0',
    width: '77px',
    textAlign: 'center',
  },

  qntCell: {
    padding: '8px 38px 8px 20px',
    borderRight: '1px solid #e0e0e0',
  },

  totalCell: {
    padding: '8px 20px 8px 20px',
    borderRight: '1px solid #e0e0e0',
  },

  barCodeCell: {
    padding: '8px 65px 8px 20px',
    borderRight: '1px solid #e0e0e0',
  },

  warehouseCell: {
    padding: '8px 63px 8px 20px',
    borderRight: '1px solid #e0e0e0',
  },

  tariffCell: {
    width: '190px',
    padding: '8px 7px 8px 20px',
    borderRight: '1px solid #e0e0e0',
  },

  commentCell: {
    padding: '8px 100px 8px 20px',
  },

  buttonsWrapper: {
    textAlign: 'right',
    marginTop: '16px',
  },
  buyNowBtn: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    marginRight: '8px',
  },
  cancelBtn: {
    backgroundColor: '#d5d5d5',
    color: 'rgba(61, 81, 112, 1)',
    textTransform: 'none',
    '&:hover': {
      color: '#fff',
    },
  },

  sumWrapper: {
    textAlign: 'right',
  },

  sumText: {
    fontSize: '18px',
    lineHeight: '140%',
    color: '#354256',
  },
}))

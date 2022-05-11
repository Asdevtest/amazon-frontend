import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: '1px solid #E0E0E0',
  },

  badBox: {
    backgroundColor: '#FFC7C7',
  },

  boxNoPrice: {
    border: '1px solid red',
  },
  tableCell: {
    padding: '0 5px',
    textAlign: 'left',
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  priceCellRight: {
    textAlign: 'center',
    width: '150px',
  },
  imgWrapper: {
    minHeight: '50px',
    width: '50px',
  },
  img: {
    height: '60px',
    width: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  crossBtn: {
    width: '20px',
    height: '20px',
    minWidth: 'auto',
  },
  tableCellCrossBtn: {
    width: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // width: '500px'
  },

  boxItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '350px',
    gap: '5px',
  },

  superBoxTypo: {
    minWidth: '40px',
    color: 'blue',
    fontWeight: 'bold',
  },

  alertSpan: {
    color: 'red',
  },

  indexCell: {
    width: '60px',
    textAlign: 'center',
  },
  productCell: {
    minWidth: '300px',
  },

  dementionsCell: {
    width: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dementionsSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '190px',
  },

  dementionsTitle: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#001029',
  },

  shippingLabelCell: {
    // width: '250px'
  },

  priceCell: {
    width: '140px',

    textAlign: 'center',
  },

  spanText: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#001029',
  },

  amazonTitle: {
    fontWeight: 'bold',
  },

  checkboxWrapper: {
    margin: '0 10px 0 20px',

    display: 'flex',

    alignItems: 'center',
  },

  link: {
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  boxItemSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },

  shippingLabelWrapper: {
    width: '350px',
    display: 'flex',
    alignItems: 'center',
  },

  barCodeLabelWrapper: {
    width: '270px',
    display: 'flex',
    alignItems: 'center',
  },

  downloadLink: {
    color: '#006CFF',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyImg: {
    marginLeft: '10px',
    width: '15px',
    height: '15px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  row: {
    outline: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(0.99)',
      opacity: '0.9',
    },
  },
}))

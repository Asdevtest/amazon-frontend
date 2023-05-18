import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: '1px solid #E0E0E0',
  },

  badBox: {
    backgroundColor: theme.palette.background.red,
  },

  boxNoPrice: {
    border: '1px solid red',
  },
  tableCell: {
    padding: '0 5px',
    textAlign: 'left',
    display: 'table-cell',
    verticalAlign: 'middle',

    color: theme.palette.text.second,
  },
  priceCellRight: {
    textAlign: 'center',
    width: '100px',
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
    width: '420px',
    gap: '5px',
  },

  superBoxTypo: {
    minWidth: '40px',
    // color: 'blue',
    fontWeight: 'bold',

    color: theme.palette.primary.main,
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

    minHeight: 134,
  },

  dementionsCell: {
    width: '250px',
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
    color: theme.palette.text.general,
  },

  shippingLabelCell: {
    // width: '250px'
  },

  priceCell: {
    width: '140px',

    textAlign: 'center',
  },

  suberboxPriceCellWrapper: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.text.second,
    margin: 0,
    padding: 0,
    gap: 15,
  },

  suberboxPriceCell: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  spanText: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
  },

  amazonTitle: {
    fontWeight: 'bold',
  },

  checkboxWrapper: {
    // margin: '0 10px 0 20px',

    display: 'flex',

    alignItems: 'center',
  },

  link: {
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  boxItemSubWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },

  shippingLabelWrapper: {
    width: '180px',
    height: '60px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  barCodeLabelWrapper: {
    width: '270px',
    height: '50px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  downloadLink: {
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyImg: {
    marginLeft: '30px',
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  linkWrapper: {
    display: 'flex',
    // alignItems: 'center',
    gap: '10px',
  },

  row: {
    outline: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      // transform: 'scale(0.99)', // изменяет красный цвет при наведении
      boxShadow: 'inset 0 0 30px rgba(7, 179, 247, .8)',
    },
  },

  boxItemSubInfoWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    margin: '15px 0',
  },
  boxItemSubSubInfoWrapper: {
    width: '100%',
  },
  pricePerAmoutCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    gap: '60px',
  },

  alertText: {
    color: '#FD3939',
  },

  priceText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.primary.main,
  },
}))

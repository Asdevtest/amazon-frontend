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
  },

  boxItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '420px',
    gap: '5px',
  },

  superBoxTypo: {
    minWidth: '40px',
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
    display: 'flex',
    alignItems: 'center',
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
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  linkWrapper: {
    display: 'flex',
    gap: '10px',
  },

  row: {
    outline: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
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

  asinTitle: {
    fontWeight: 400,
    fontSize: '1rem',
  },
}))

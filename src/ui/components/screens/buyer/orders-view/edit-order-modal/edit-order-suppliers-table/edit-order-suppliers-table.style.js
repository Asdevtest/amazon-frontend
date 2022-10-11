import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '600',
  },
  input: {
    width: '100%',
  },
  text: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },
  iconButton: {
    height: '40px',
    width: '40px',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
  title: {
    fontSize: '24px',
    lineHeight: '20px',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  table: {
    width: '100%',

    border: '1px solid rgb(224, 224, 224)',
    '& td': {
      flexShrink: 0,
      borderBottom: 'none',
    },
    '& th': {
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  alert: {
    marginBottom: '24px',
  },
  mainCardWrapper: {
    padding: '16px',
    marginBottom: '24px',
  },
  parseButtonsWrapper: {
    display: 'flex',
    marginBottom: '16px',
  },
  buttonParseAmazon: {
    marginRight: '16px',
  },
  productFieldBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  productCheckboxBox: {
    alignItems: 'center',
    display: 'flex',
  },
  typoCheckbox: {
    marginRight: '16px',
  },
  supplierContainer: {
    marginBottom: '20px',
  },
  supplierIcon: {
    marginRight: '16px',
  },
  supplierIconBackground: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
  },
  tableCellPadding: {
    padding: '16px 24px',
  },
  centerTableCellPadding: {
    padding: '16px 24px',
  },
  alignCenter: {
    textAlign: 'center',
    minWidth: 100,
  },
  alignRight: {
    textAlign: 'right',
  },
  rightBoxComments: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  heightFieldAuto: {
    height: 'auto',

    padding: 0,
    border: 'none',
  },
  buttonsWrapper: {
    display: 'flex',
  },
  buttonNormal: {
    flexGrow: 1,
    marginRight: '16px',
  },
  buttonDelete: {
    flexGrow: 1,
  },
  tableRowAcceptedSupplier: {
    // backgroundColor: '#baffba',
    backgroundColor: theme.palette.background.tableCurRow,
  },
  tableRowSelectedSupplier: {
    backgroundColor: theme.palette.background.tableCurRow,
  },

  textCell: {
    width: '254px',
    maxHeight: '100px',
    overflowY: 'auto',
    textAlign: 'center',
  },

  nameCell: {
    minWidth: '164px',
    textAlign: 'center',
  },

  priceCell: {
    minWidth: '55px',
    textAlign: 'center',
  },

  deliveryCell: {
    minWidth: '83px',
    textAlign: 'center',
  },

  amountCell: {
    minWidth: '115px',
    textAlign: 'center',
  },
  button: {
    display: 'flex',
  },

  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '209px',
  },

  link: {
    fontSize: 12,
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyImg: {
    marginLeft: 30,
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  name: {
    width: '300px',
  },
}))

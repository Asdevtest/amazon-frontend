import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    // color: theme.palette.text.general,
    fontWeight: '600',

    color: theme.palette.text.general,
  },
  strategyLabel: {
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '600',
    marginBottom: '12px',
  },

  strategyOption: {
    // color: '#001029',

    color: theme.palette.text.general,
  },

  input: {
    height: '32px',
    borderRadius: '4px',
    width: 'calc(100% - 110px)',
  },

  text: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },
  iconBtn: {
    maxHeight: '40px',
    maxWidth: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',

    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  table: {
    border: '1px solid rgb(224, 224, 224)',
    '& td': {
      flexShrink: 0,
      color: theme.palette.text.general,
      borderBottom: 'none',
    },
    '& th': {
      color: theme.palette.text.general,
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
    // flexDirection: 'column',
    // height: '100%',
    justifyContent: 'space-between',
    // alignItems: 'flex-end'
  },
  productCheckboxBox: {
    alignItems: 'center',
    display: 'flex',
  },

  supplierContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '16px',
  },
  supplierIcon: {
    marginRight: '16px',
  },
  iconBtnRemove: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
  },
  iconBtnAccept: {
    backgroundColor: 'rgba(30, 220, 30, 1)',
  },
  iconBtnAcceptRevoke: {
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
  supplierActionsWrapper: {
    display: 'flex',
  },
  supplierActionsTitle: {
    marginRight: '10px',
  },
  supplierTitle: {
    marginBottom: '5px',
  },
  amazonLink: {
    width: '100%',
    overflowX: 'auto',
    whiteSpace: 'nowrap',

    background: 'rgba(59, 59, 59, 0.1)',
    borderRadius: '5px',
    padding: '0 5px',

    border: '0.3px solid rgba(118, 118, 118, 0.1)',
  },

  nativeSelect: {
    width: '300px',

    color: theme.palette.text.general,

    height: 36,

    // backgroundColor: theme.palette.background.main,
  },

  strategyWrapper: {
    display: 'flex',
    gap: '28px',
  },

  shopsFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },

  shopsSelect: {
    width: '307px',
  },

  selectedShopsWrapper: {
    width: '307px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },

  selectedShop: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '5px 15px',
    backgroundColor: theme.palette.background.second,
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.general,
    maxWidth: '250px',
  },
  selectedShopText: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  removeShopButton: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    zIndex: 999,
  },

  productCheckboxBoxesWrapper: {
    display: 'flex',
    gap: '20px',
  },

  defaultBtn: {
    marginLeft: '10px',
    borderRadius: '4px',
    height: '32px',
    width: '120px',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  skuItemTitle: {
    fontSize: '20px',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      zIndex: '10',
      overflow: 'visible',
      fontWeight: 'bold',
      backgroundColor: 'rgba(0,0,0, .2)',
      maxWidth: 'none',
    },
  },

  skuItemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  skuItemsWrapper: {
    marginLeft: '2px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '0 10px',

    border: '1px solid rgba(0, 0, 0, .1)',
    borderRadius: '10px',
  },

  rightBlockWrapper: {
    display: 'flex',
    marginLeft: '30px',
    justifyContent: 'space-between',
    width: '520px',
  },

  fieldsSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '250px',
  },

  shortInput: {
    width: '120px',
  },

  suppliersWrapper: {
    // justifySelf: 'flex-end',
    // marginBottom: 'auto'
    // display: 'flex',
    // height: '100%',
    // alignSelf: 'flex-end'
  },

  editButton: {
    marginTop: '15px',
  },

  linkDecoration: {
    '&:hover': {
      textDecoration: 'none',
    },
  },

  linkOnEdit: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    color: theme.palette.primary.main,
  },

  supplierButtonWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },

  noActionSupplierButtonWrapper: {},

  supplierButtonText: {
    maxWidth: '98px',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  mainWrapper: {
    // width: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // minHeight: 500
  },

  disabledOption: {
    color: 'rgba(0, 0, 0, 0.2)',
  },

  shopsWrapper: {
    marginBottom: '30px',
  },

  inputAsin: {
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '0 5px',
    height: '50px',

    border: '1px solid rgba(0, 0, 0, .1)',
    borderRadius: '10px',
    fontSize: '20px',

    overflow: 'hidden',
    textOverflow: 'ellipsis',

    color: theme.palette.text.general,
  },

  subInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  copyImg: {
    width: '30px',
    height: '30px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  inputLink: {
    width: '600px',

    overflow: 'hidden',

    // border: `1px solid ${theme.palette.input.border}`,

    color: theme.palette.text.general,

    outline: 'none',
  },

  inputDisabled: {
    backgroundColor: theme.palette.input.disabled,

    border: `none`,
  },
  copyLink: {
    width: '100%',
    display: 'flex',
    alignItems: 'end',
    gap: '10px',
  },

  selectMenu: {
    width: '317px',
  },
}))

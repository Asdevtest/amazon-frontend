import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '600',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
    },
  },

  hsFieldContainer: {
    marginTop: 20,
  },

  hsCodeBtn: {
    width: 300,
    height: 32,
  },

  strategyOption: {
    color: theme.palette.text.general,
  },

  menuItemWrapper: {
    width: 300,
  },

  shopOption: {
    width: '100%',
  },

  shopName: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },

  buttonParseAmazon: {
    whiteSpace: 'nowrap',
  },
  productFieldBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 30,
  },
  productCheckboxBox: {
    alignItems: 'center',
    display: 'flex',
    gap: 10,
  },

  nativeSelect: {
    width: '300px',
    color: theme.palette.text.general,
    height: 40,
    '& > disabled': {
      backgroundColor: theme.palette.input.customDisabled,
    },
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

  productCheckboxBoxesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  productCheckboxBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },

  radioLabel: {
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.text.general,
  },

  radioRoot: {
    padding: 0,

    '& > span > svg': {
      width: 18,
      height: 18,
    },

    '& > span > svg:first-of-type': {
      color: theme.palette.text.general,
    },
  },

  rightBlockWrapper: {
    display: 'flex',
    gap: 15,
    width: '520px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down(768)]: {
      width: '48%',
    },
  },

  fieldsSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  shortInput: {
    width: '100%',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(768)]: {
      width: '48%!important',
    },
  },
  shortInputClass: {
    width: 100,
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  editButtonWrapper: {
    width: 'fit-content',
    marginTop: '15px',
  },

  linkDecoration: {
    color: 'red !important',
    '&:hover': {
      textDecoration: 'none',
    },
  },

  linkOnEdit: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },

  shopsWrapper: {
    marginBottom: '30px',
  },

  inputAsin: {
    width: 270,
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '0 5px',
    height: 40,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    borderRadius: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
  },

  subInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  inputLink: {
    width: '100%',
    maxWidth: '600px',
    overflow: 'hidden',
    color: theme.palette.text.general,
    outline: 'none',
    textDecoration: 'none',
  },

  lamazonText: {
    color: theme.palette.primary.main,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    backgroundColor: theme.palette.input.customDisabled,
    borderRadius: 4,
    padding: '6px 8px',
    height: 36,
  },

  inputDisabled: {
    backgroundColor: theme.palette.input.customDisabled,
    border: `none`,
  },
  linkAndButtonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(1440)]: {
      flexWrap: 'wrap',
    },
  },
  copyLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '75%',
    [theme.breakpoints.down(1440)]: {
      width: '100%',
      marginBottom: '20px',
      marginRight: '10px',
    },
  },

  subUsersBodyWrapper: {
    width: 270,
    maxHeight: 175,
    overflowY: 'auto',
    backgroundColor: theme.palette.background.general,
    border: `1px solid ${theme.palette.input.customDisabled}`,
    borderRadius: '4px',
    padding: 5,
  },
  subUsersBody: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '6px 0 6px 10px',
    backgroundColor: theme.palette.background.general,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    gap: 10,
  },
  subUsersTitleWrapper: {
    marginBottom: 10,
  },
  subUsersTitle: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  subUsersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 270,
  },
  strategyAndSubUsersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },
  field: {
    borderRadius: '4px',
  },
  inputField: {
    height: 40,
    width: 225,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  redFlags: {
    display: 'flex',
    flexDirection: 'column',
    width: 'max-content',
  },

  redFlagsView: {
    display: 'flex',
    flexDirection: 'unset',
    width: '100%',
    maxWidth: '226px',
    flexWrap: 'wrap',
  },

  customSubMainWrapper: {
    padding: '10px 10px !important',
    width: '300px !important',
  },

  customSearchInput: {
    width: '100% !important',
    padding: '0 !important',
    margin: '0 !important',
  },

  interconnectedProductsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    gap: '10px',
  },

  interconnectedProductsBodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '205px',
    overflowY: 'auto',
    paddingRight: '15px',
  },

  interconnectedProductsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '15px',
  },

  interconnectedProductsHeaderPadding: {
    paddingRight: '31px',
  },

  plusIcon: {
    width: '21px !important',
    height: '21px !important',
  },

  plusButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 24,
    height: 24,
    minWidth: 'unset !important',
    padding: 0,
    borderRadius: '5px',
  },

  bindProductButton: {
    display: 'flex',
    justifyContent: 'center',
    gap: '9px',
  },
}))

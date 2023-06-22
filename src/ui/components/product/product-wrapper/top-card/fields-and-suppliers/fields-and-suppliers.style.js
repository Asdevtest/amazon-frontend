import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '600',
    color: theme.palette.text.general,
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
    width: '100%',
  },
  productFieldBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 30,
  },
  productCheckboxBox: {
    paddingTop: 5,
    alignItems: 'center',
    display: 'flex',
  },

  nativeSelect: {
    width: '300px',
    color: theme.palette.text.general,
    height: 33,
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
  },
  productCheckboxBoxWrapper: {
    display: 'flex',
    gap: '20px',
  },

  rightBlockWrapper: {
    display: 'flex',
    gap: 15,
    width: '520px',
  },
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  fieldsSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  shortInput: {
    width: '100%',
    whiteSpace: 'nowrap',
  },
  shortInputClass: {
    width: 100,
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    color: theme.palette.primary.main,
  },

  disabledOption: {
    color: 'rgba(0, 0, 0, 0.2)',
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
    width: '600px',
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
  },
  copyLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
    alignItems: 'flex-end',
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
}))

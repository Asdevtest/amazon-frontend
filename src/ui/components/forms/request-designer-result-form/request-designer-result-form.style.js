/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMainWrapper: {
    width: 1500,
    minHeight: 800,

    // padding: '0 10px',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  headerLabel: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',

    color: theme.palette.text.main,

    // marginBottom: 20,
  },

  mainTitleMargin: {
    marginBottom: 35,
  },

  labelMargin: {
    marginBottom: 10,
  },

  textMargin: {
    marginBottom: 20,
  },

  headerSubText: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'pre-line',
    breakWord: 'word-break',
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
    marginBottom: 5,
  },

  headerLeftSubWrapper: {
    maxWidth: '50%',
  },

  accordionMain: {
    boxShadow: 'none',
  },

  accordion: {
    display: 'flex !important',
    justifyContent: 'flex-start',
    padding: 0,

    width: 'min-content',
  },

  accordionContent: {
    flexGrow: 0,
    width: 'max-content',
  },

  expandIconWrapper: {
    margin: '0 auto 0 20px',
  },

  spanText: {
    color: theme.palette.primary.main,
  },

  uploadGuidWrapper: {
    display: 'flex',
    gap: 5,
  },

  timeSpan: {
    fontWeight: 600,
    fontSize: 14,
  },

  bodyWrapper: {
    height: 200,
    background: 'grey',
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 30,
    gap: 30,
  },

  containerField: {
    width: 'min-content',
    marginBottom: '0 !important',
  },

  linkInput: {
    width: 350,
  },

  // label: {
  //   fontWeight: 400,
  //   fontSize: 14,
  //   lineHeight: '19px',

  //   color: theme.palette.text.second,

  //   marginBottom: 10,
  // },
  // numberInputField: {
  //   marginBottom: 20,
  // },
  // input: {
  //   height: 40,
  // },
  // pubInput: {
  //   width: '100%',
  //   height: 40,
  //   borderRadius: 4,

  //   padding: '0 5px',

  //   '&:before, &:after': {
  //     border: 'none',
  //   },
  // },

  // buttonsWrapper: {
  //   display: 'flex',
  //   gap: 40,

  //   justifyContent: 'flex-end',
  // },
  // button: {
  //   padding: '0 25px',
  // },
  // cancelButton: {
  //   color: theme.palette.text.general,
  // },

  // linksWrapper: {
  //   width: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',

  //   marginBottom: 20,
  // },
  // inputWrapper: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   width: '100%',

  //   gap: 20,
  // },
  // linksSubWrapper: {
  //   width: '100%',
  //   maxHeight: 130,
  //   overflowY: 'auto',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   marginTop: 10,
  //   gap: 5,

  //   padding: '0 5px 0 15px',

  //   boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
  // },
  // linkWrapper: {
  //   width: '100%',

  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // linkTextWrapper: {
  //   width: '80%',
  //   overflow: 'auto',
  //   whiteSpace: 'nowrap',
  // },
  // linksBtnsWrapper: {
  //   display: 'flex',
  //   alignItems: 'center',
  // },
  // deleteBtn: {
  //   color: theme.palette.text.second,
  //   width: '20px',
  //   height: '20px',
  // },
  // commentFieldWrapper: {
  //   marginBottom: 20,
  // },
  // commentField: {
  //   height: 'auto',
  // },
  // dragAndDropWrapper: {
  //   marginBottom: 20,
  // },
}))

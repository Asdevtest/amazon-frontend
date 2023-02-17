import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '700px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      maxWidth: '520px',
    },
  },
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '24px',
    [theme.breakpoints.down(768)]: {
      color: theme.palette.text.general,
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '22px',
      marginBottom: '24px',
    },
  },
  modalText: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  count: {
    fontSize: '13px',
    lineHeight: '15px',
    color: 'rgba(189, 194, 209, 1)',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
  },
  orderImg: {
    height: '64px',
    width: '64px',
    marginRight: '12px',
  },
  orderTitle: {
    fontWeight: 500,
  },
  orderText: {
    fontSize: '14px',
  },
  orderChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
  },
  orderChipHover: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  orderChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  tooltip: {
    fontSize: '13px',
    margin: '0px',
  },

  boxCode: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '30px 0px',
  },

  imageFileInputWrapper: {
    width: '700px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },
  typoCode: {
    marginRight: '8px',
  },
  input: {
    width: '400px',
  },

  saveButton: {
    width: '179px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '121px',
      height: '40px',
    },
  },
  cancelButton: {
    width: '179px',
    height: '40px',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      width: '121px',
      height: '40px',
    },
  },
  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: '20px',
    gap: 15,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  numberInputFieldsWrapper: {
    width: '100%',
    height: 66,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 15,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'row',
    },
  },
  numberInputField: {
    width: 222,
    margin: 0,
  },
  blockOfNewBoxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '30px',
    gap: '20px',
    [theme.breakpoints.down(768)]: {
      justifyContent: 'center',
      marginTop: '30px',
      gap: '20px',
    },
  },

  photoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },

  imgBox: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  sizesSubWrapper: {
    // margin: '5px 0 0 25px',
  },

  photoAndFilesTitle: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    marginBottom: '10px',
    [theme.breakpoints.down(768)]: {
      textAlign: 'center',
    },
  },
  checkboxContainer: {
    marginTop: '10px',
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      color: theme.palette.text.second,
    },
  },

  dimensionsWrapper: {
    display: 'flex',
    gap: 14,
    alignItems: 'flex-end',
    marginTop: 35,
  },

  subTitle: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.text.general,
  },

  divider: {
    height: '160px',
    // marginBottom: 15,
  },
  photoAndFilesTitleMobileWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
}))

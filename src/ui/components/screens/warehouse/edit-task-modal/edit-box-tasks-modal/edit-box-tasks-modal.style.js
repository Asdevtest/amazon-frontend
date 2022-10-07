import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalWrapper: {
    width: '700px',
  },
  modalTitle: {
    color: '#001029',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '24px',
  },
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
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
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
  },
  orderChipHover: {
    '&:hover, &:focus': {
      backgroundColor: 'rgb(0, 123, 255)',
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
  },
  cancelButton: {
    width: '179px',
    height: '40px',
    color: '#001029',
  },
  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: '20px',
    gap: 15,
  },
  numberInputFieldsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 15,
  },
  numberInputField: {
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
    color: '#001029',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    marginBottom: '10px',
  },
  checkboxContainer: {
    marginTop: '10px',
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#656565',
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
    color: '#001029',
  },

  divider: {
    height: '160px',
    // marginBottom: 15,
  },

  '@media (max-width: 768px)': {
    modalWrapper: {
      width: '100%',
      maxWidth: '520px',
    },
    modalTitle: {
      color: '#001029',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '22px',
      marginBottom: '24px',
    },
    imageFileInputWrapper: {
      width: '100%',
    },
    label: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
    numberInputFieldsBlocksWrapper: {
      flexDirection: 'column',
      width: '100%',
    },
    numberInputFieldsWrapper: {
      flexDirection: 'row',
    },
    photoAndFilesTitleMobileWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    photoAndFilesTitle: {
      textAlign: 'center',
    },
    buttonsWrapper: {
      justifyContent: 'center',
      marginTop: '30px',
      gap: '20px',
    },
    saveButton: {
      width: '121px',
      height: '40px',
    },
    cancelButton: {
      width: '121px',
      height: '40px',
    },
  },
}))

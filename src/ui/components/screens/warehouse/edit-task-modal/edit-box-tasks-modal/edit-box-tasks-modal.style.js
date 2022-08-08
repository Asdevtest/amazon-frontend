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
  divider: {
    margin: '0px -24px',
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
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: '20px',
    gap: '30px',
  },
  numberInputFieldsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
  },
  numberInputField: {
    margin: '0 5px',
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
    cursor: 'pointer',
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
}))

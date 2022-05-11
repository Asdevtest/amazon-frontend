import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: 'rgb(61, 81, 112)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
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
    margin: '48px 0px',
  },

  imageFileInputWrapper: {
    width: '694px',
  },
  typoCode: {
    marginRight: '8px',
  },
  input: {
    width: '400px',
  },
  button: {
    marginRight: '10px',
  },
  saveBtn: {
    marginRight: '8px',
  },
  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: '20px',
    gap: '10px',
  },
  numberInputFieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    marginTop: '16px',
  },

  photoWrapper: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: '5px 0 0 25px',
  },
}))

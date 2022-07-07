import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  modalContainer: {
    width: '750px',
  },
  titleDivider: {
    margin: '32px -24px',
  },
  fieldsDivider: {
    margin: '32px -24px 20px',
  },
  buttonsWrapperClient: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: '10px',
    marginTop: '16px',
  },

  prevBtnClient: {
    height: '40px',
    alignSelf: 'end',
  },

  saveBtnClient: {
    width: '240px',
    display: 'block',
    marginBottom: '10px',
    backgroundColor: '#4caf50',
    color: 'ffffff',
    '&:hover': {
      backgroundColor: '#009a07',

      '@media (hover: none)': {
        backgroundColor: '#009a07',
      },
    },
  },

  saveBtn: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    marginRight: '8px',
  },
  cancelBtn: {
    backgroundColor: '#d5d5d5',
    color: 'rgba(61, 81, 112, 1)',
    textTransform: 'none',
    '&:hover': {
      color: '#fff',
    },
  },
  commentField: {
    height: 'auto',
    width: '100%',
  },
  bottomWrapper: {
    display: 'flex',
  },

  loadTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },
  imagesButton: {
    marginTop: '30px',
  },

  imageFileInputWrapper: {
    width: '700px',
  },

  photoLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  photoLinkButton: {
    width: '160px',
    height: 'auto',
    marginLeft: '20px',
    marginTop: '10px',
  },

  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  checkboxText: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
  },

  nameBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  nameContainer: {
    width: '340px',
  },

  middleContainer: {
    width: '170px',
  },

  shortContainer: {
    width: '120px',
  },

  middleInput: {
    width: '160px',
  },

  normalLabel: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
  },

  leftMargin: {
    marginLeft: '10px',
  },

  rightMargin: {
    marginRight: '10px',
  },

  costBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  rateLabel: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
  },

  rateContainer: {
    width: 'min-content',
  },

  calculationMainWrapper: {
    display: 'flex',
  },

  calculationWrapper: {},

  calculationSubWrapper: {},

  divider: {
    margin: '35px 18px 10px',
  },

  sizesSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sizesBottomWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },

  sizesWrapper: {
    display: 'flex',
    flexDirection: 'column',

    width: '270px',
  },

  sizeContainer: {
    width: '100px',
  },
  sizeInput: {
    width: '85px',
  },

  boxInfoWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  boxInfoSubWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 20,
  },

  calculationBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

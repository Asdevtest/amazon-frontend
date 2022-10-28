import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },

  standartText: {
    color: theme.palette.text.general,
  },

  modalContainer: {
    width: '800px',
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
  },
  cancelBtn: {
    color: theme.palette.text.general,
    textTransform: 'none',
    '&:hover': {
      color: '#fff',
    },
    marginLeft: '8px',
  },

  commentField: {
    height: 'auto',
    width: '100%',
  },
  bottomWrapper: {
    display: 'flex',
  },

  loadTitle: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },
  imagesButton: {
    marginTop: '30px',
  },

  imageFileInputWrapper: {
    width: '798px',
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
    color: theme.palette.text.general,
    fontWeight: '600',
  },

  nameBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  nameContainer: {
    width: '380px',
  },

  linkContainer: {
    width: '590px',
  },

  middleContainer: {
    width: '190px',
  },

  shortContainer: {
    width: '120px',
  },

  middleInput: {
    width: '160px',
  },

  rateInput: {
    width: '185px',
    marginLeft: 10,
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
    margin: '35px 10px 10px 10px',
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

  link: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    color: theme.palette.primary.main,
    maxWidth: '100%',
    overflow: 'auto',
  },

  photoAndFilesWrapper: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
}))

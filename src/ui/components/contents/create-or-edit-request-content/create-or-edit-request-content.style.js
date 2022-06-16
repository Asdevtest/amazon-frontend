import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  mainContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  mainSubRightWrapper: {
    display: 'flex',

    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },

  mainSubRightTwoStepWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  middleStepTwoMainWrapper: {
    width: '70%',
    marginLeft: 'auto',
  },

  middleStepTwoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  middleStepTwoSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  mainTitle: {
    fontWeight: '400',
    fontSize: '34px',
    lineHeight: '40px',
    color: '#001029',
  },

  headerWrapper: {
    marginBottom: '30px',
  },

  title: {
    marginBottom: '20px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
  },

  mainSubTitle: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#001029',
    marginTop: '30px',
    width: '373px',
  },

  mainSubStepTwoTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
    marginTop: '20px',
  },

  middleWrapper: {
    width: '50%',
  },

  rightWrapper: {
    width: '50%',
    marginLeft: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  rightTwoStepWrapper: {
    width: '100%',
  },

  checkboxWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  footerWrapper: {
    display: 'flex',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',

    alignItems: 'center',
  },

  stepsWrapper: {},

  step: {
    margin: '0',
    padding: '0',
    marginTop: '20px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
  },

  buttonsWrapper: {
    display: 'flex',
    margin: '0 0 0 20px',
  },

  backBtn: {
    width: '211px',
  },

  successBtn: {
    marginLeft: '60px',
    width: '211px',
  },

  successBtnTextWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  successBtnArrow: {
    marginLeft: '15px',
  },

  disablesBtnArrow: {
    opacity: '.2',
  },

  footerRightWrapper: {
    display: 'flex',

    flexDirection: 'column',
  },

  descriptionFieldWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',

    '& > span': {
      marginTop: '-20px',
    },
  },

  descriptionField: {
    height: '81px',
    width: '100%',
    overflowY: 'hidden',
  },

  rightTwoStepSubFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '90px',
  },

  twoStepFieldResult: {
    minHeight: '40px',

    // background: 'rgba(200,200,200, .1)',
  },

  descriptionStepTwoField: {
    width: 'auto',
    // height: 400,
    overflow: 'hidden',
  },

  twoStepDescriptionFieldResult: {
    width: '100%',
    height: '200px',
    whiteSpace: 'pre-wrap',
  },

  deadlineError: {
    borderBottom: '1px solid red',
  },
  deadlineErrorText: {
    color: 'red',
  },

  nameFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',

    '& > span': {
      marginTop: '-20px',
    },
  },

  nameField: {
    height: '40px',
    width: '100%',
    overflowY: 'hidden',
  },

  spanLabel: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 'bold',
    color: '#001029',
  },

  spanLabelSmall: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#001029',
  },

  filesContainer: {
    marginTop: '20px',
    width: 'auto',
    marginRight: '50px',
  },

  linkText: {
    color: '#007BFF',
    cursor: 'pointer',
    transition: '.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'auto',

    '&:hover': {
      opacity: '0.8',
    },
  },

  dateAndTimeWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'center',
  },
  priceAndAmountWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'center',
  },

  checkboxesWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'center',
    marginBottom: '30px',
  },

  error: {
    color: 'red',
  },

  adviceWrapper: {
    width: '30%',
    // marginRight: 30,
  },

  adviceTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    marginBottom: '22px',
    color: '#001029',
  },
  adviceListItem: {
    padding: '0',
  },

  adviceListItemText: {
    marginLeft: '27px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#001029',
  },

  trainingTextWrapper: {
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '35px',
    marginTop: '18px',
  },

  trainingText: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#656565',
  },

  trainingLink: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    margin: '0 5px',
  },

  // carouselWrapper: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  imagesWrapper: {
    width: '50%',
  },

  imagesTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: '#001029',
  },

  mainTwoStepWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  inputDescriptionStepTwoField: {
    height: '100%',
    width: '100%',
    padding: '0',
    backgroundColor: '#fafafa',
    '& :disabled': {
      backgroundColor: '#fafafa',
      height: '100%',
    },
  },

  imagesAndFilesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    margin: '20px 0 20px 0',
  },

  filesTitleWrapper: {
    width: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  documentsWrapper: {
    width: '50%',
  },

  documentWrapper: {
    position: 'relative',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',

    '&:hover > :not(:last-child)': {
      opacity: '0.3',
    },

    '&:hover > span': {
      display: 'block',
      position: 'absolute',
      textAlign: 'center',
      color: '#001029',
    },
  },

  documentHover: {
    display: 'none',
  },

  documentTitle: {
    fontSize: '12px',
    textAlign: 'center',
  },

  emptyProposalsIconWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '24px 0 24px 0',
  },

  emptyProposalsIcon: {
    width: '100px',
    height: '100px',
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyDocumentIcon: {
    width: '60px',
    height: '60px',
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyProposalsDescriptionWrapper: {
    width: '70%',
  },

  emptyProposalsTitle: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    color: '#001029',
    marginBottom: '10px',
  },

  emptyProposalsDescription: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: '#001029',
  },

  documentEmpty: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    color: '#001029',
    marginTop: '10px',
  },
}))

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',

    gap: 10,
    // justifyContent: 'space-between',
  },

  mainSubWrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: theme.palette.background.general,
    borderRadius: 4,
  },

  mainContentWrapper: {
    height: '100%',
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

    gap: 50,
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
    color: theme.palette.text.general,
  },

  headerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
<<<<<<< HEAD
    marginBottom: 15,
=======
    marginBottom: 25,
>>>>>>> 5e7dda5e4 (5343: freelance)
  },

  title: {
    marginBottom: '20px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',

    color: theme.palette.text.general,
  },

  mainSubTitle: {
    fontWeight: '400',
    fontSize: '14px',
    color: theme.palette.text.second,
    // width: '373px',
  },

  mainSubStepTwoTitle: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '140%',
    color: theme.palette.text.second,
    marginTop: 5,
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

    display: 'flex',
    justifyContent: 'space-between',
  },

  rightTwoStepMainWrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
  },

  checkboxWrapper: {
    position: 'relative',

    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    margin: 0,

    cursor: 'pointer',
  },

  checkboxSubWrapper: {
    width: 35,
  },

  checkbox: {
    top: -6,
    left: -12,
    position: 'absolute',
  },

  checkboxPosition: {
    top: 3,
  },

  footerWrapper: {
    display: 'flex',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',

    alignItems: 'center',
  },

  stepsWrapper: {},

  buttonsWrapper: {
    display: 'flex',
    margin: '0 0 0 20px',
  },

  backBtn: {
    width: '211px',
    height: '42px',

    color: theme.palette.text.general,
  },

  successBtn: {
    marginLeft: '60px',
    width: '211px',
    height: '42px',
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
    height: '95px',
    width: '100%',
    overflowY: 'hidden',
  },

  rightTwoStepSubFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  pricesWrapper: {
    display: 'flex',
    gap: 5,
  },

  twoStepFieldResult: {
    minHeight: '40px',

    fontWeight: 600,

    color: theme.palette.text.main,
  },
  requestTitle: {
    maxHeight: 150,
    width: 250,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  typoSpan: {
    fontWeight: 600,
    color: theme.palette.text.main,
  },
  oldPrice: {
    textDecoration: 'line-through',
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

  deadlineErrorText: {
    color: 'red',
  },

  nameFieldWrapper: {
    display: 'flex',
<<<<<<< HEAD
    justifyContent: 'space-between',
=======
    flexDirection: 'column',
    alignItems: 'end',

    // '& > span': {
    //   marginTop: '-20px',
    // },
>>>>>>> 5e7dda5e4 (5343: freelance)
  },

  nameField: {
    height: '40px',
    width: '100%',
    overflowY: 'hidden',
  },

  charactersHints: {
    color: theme.palette.text.second,
  },

  spanLabel: {
    fontSize: '14px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.text.second,

    whiteSpace: 'nowrap',

    marginBottom: 5,
  },

  spanLabelSmall: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.text.second,

    marginBottom: 5,
  },

  filesContainer: {
    marginTop: '20px',
    width: 'auto',
    marginRight: '50px',
  },

  linkText: {
    color: theme.palette.primary.main,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
    gap: '30px',
    alignItems: 'center',

    marginBottom: 5,
  },
  priceAndAmountWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'center',
  },

  checkboxAndButtonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    // gap: '30px',
    // alignItems: 'center',
  },
  checkboxProposalWrapper: {
    width: '375px !important',
  },
  checkboxProposalMarginTopWrapper: {
    marginTop: 23,
  },
  checkboxesWrapper: {
    width: '100%',
    display: 'flex',
    // justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'center',

    marginBottom: 20,
  },

  error: {
    color: 'red !important',
  },

  adviceWrapper: {
    width: '30%',
    // marginRight: 30,
  },

  adviceTitle: {
    marginBottom: '22px',

    fontSize: '14px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.text.second,
  },
  adviceListItem: {
    padding: '0',
  },

  adviceListItemText: {
    marginLeft: '27px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  trainingTextWrapper: {
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 20,
  },

  trainingText: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.second,
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
    fontSize: '14px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.second,
  },

  mainTwoStepWrapper: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between',
  },

  inputDescriptionStepTwoField: {
    height: '100%',
    width: '100%',
    padding: '0',
    // backgroundColor: theme.palette.,
    '& :disabled': {
      // backgroundColor: theme.palette.,
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover > :not(:last-child)': {
      opacity: '0.3',
    },

    '&:hover > span': {
      display: 'block',
      position: 'absolute',
      textAlign: 'center',
      color: theme.palette.text.general,
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
    color: theme.palette.text.general,
    marginBottom: '10px',
  },

  emptyProposalsDescription: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.general,
  },

  documentEmpty: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    color: theme.palette.text.general,
    marginTop: '10px',
  },

  steps: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepPagination: {
    display: 'flex',
    alignItems: 'center',
  },

  stepPaginationBar: {
    height: '2px',
    width: '225px',
    backgroundColor: '#C4c4c4',
  },

  stepPaginationStartBar: {
    width: '12px',
    height: '12px',
    backgroundColor: '#00B746',
    borderRadius: '50%',
  },

  stepPaginationEndBar: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },

  step: {
    backgroundColor: '#00B746',
    height: '2px',
  },

  stepTitle: {
    margin: '0',
    padding: '0',
    marginTop: 5,
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.primary.main,
  },
  restrictMoreThanOneProposal: {
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  listItemDot: {
    width: '8px !important',
  },
  nameFieldContainer: {
    width: '390px !important',
  },
  requestTypeContainer: {
    width: '370px !important',
  },
  requestTypeField: {
    width: '100%',
    height: 40,
    margin: 0,
    paddingLeft: 10,

    borderRadius: 4,

    '&:before': {
      borderBottom: 'none',
    },
  },
  nativeSelect: {
    width: '100%',
  },
  bloggerFieldContainer: {
    width: '180px !important',
  },
  bloggerFieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dateAndTimeContainerleft: {
    width: '377px !important',
  },
  dateAndTimeContainerRight: {
    width: '378px !important',
  },
  dateField: {
    width: '100%',
  },
  titleAndAsinWrapper: {
    display: 'flex',
    gap: 85,
  },
  asinWrapper: {
    display: 'flex',
    gap: 5,
  },
  changePerformerBtn: {
    width: 190,
  },

  performerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  performerAndButtonSubWrapper: {
    display: 'flex',

    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  performerAndButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'flex-end',

    width: 378,

    gap: 20,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  cardImg: {
    width: 28,
    height: 28,
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  performerDescriptionText: {
    maxHeight: 76,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },

  performerWrapperStepTwo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  nameWrapperStepTwo: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  titleContainer: {
    width: 'fit-content !important',
  },
  fitContentContainer: {
    width: 'fit-content',
  },
  infoColumn: {
    width: 'calc(100% / 3)',
    display: 'flex',
    flexDirection: 'column',
  },
  infoTextWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: 15,
  },
  performerDescriptionTextStepTwo: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    minHeight: 76,
    maxHeight: 250,

    marginBottom: 25,
  },
  checkboxText: {
    whiteSpace: 'nowrap',
  },
  checkboxWrapperLeft: {
    width: 377,
  },
  newPrice: {
    color: '#FB1D5B',
  },
}))

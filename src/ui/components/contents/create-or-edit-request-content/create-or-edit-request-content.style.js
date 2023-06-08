import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: 20,
  },

  mainSubWrapper: {
    position: 'relative',

    padding: 30,
    minHeight: 760,

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
    width: '50%',

    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',

    color: theme.palette.text.general,
  },

  mainTitleStapTwo: {
    width: '20%',
  },

  headerWrapper: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: 20,
  },

  mainSubTitle: {
    width: '50%',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',

    color: theme.palette.text.second,
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
    marginLeft: -12,

    cursor: 'pointer',
  },

  footerWrapper: {
    marginTop: 'auto',
    // position: 'sticky',
    bottom: 100,
    display: 'flex',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',

    alignItems: 'center',
  },

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
    // width: '211px',
    height: '42px',
    padding: '0 25px',
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

    marginTop: 20,
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
    maxWidth: '320px !important',
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

  deadlineErrorText: {
    color: 'red',
  },

  nameFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  dateAndTimeWrapper: {
    width: '100%',
    display: 'flex',
    gap: '30px',
    alignItems: 'center',

    marginBottom: 5,
  },
  priceAndAmountWrapper: {
    width: '100%',
    height: 90,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: '30px',
  },

  checkboxAndButtonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // gap: '30px',
    // alignItems: 'center',
  },

  checkboxAndButtonWrapperMarginTop: {
    marginTop: 25,
  },

  checkboxProposalWrapper: {
    width: '375px !important',
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
    width: '308px !important',
  },
  requestTypeContainer: {
    width: '251px !important',
  },

  asinContainer: {
    width: '185px !important',
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
    width: '100%',
    gap: 30,

    display: 'flex',
  },
  asinWrapper: {
    display: 'flex',
    width: 'fit-content',
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
    width: '250px !important',
  },
  asinContainerStapTwo: {
    width: '130px !important',
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

  performerDescriptionWrapperTextStepTwo: {
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

  customSubMainWrapper: {
    padding: '10px 0 !important',
    width: '185px !important',
  },

  customSearchInput: {
    marginLeft: 5,

    width: 158,
    height: 30,
    marginBottom: 20,
  },
  orderText: {
    width: 'fit-content',
  },

  editorMaxHeight: {
    maxHeight: '138px !important',
  },
  selectedCheckbox: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -10,
  },

  dialogContextClassName: {
    boxSizing: 'border-box',
    padding: '30px 26px 30px 44px',
  },

  priorityText: {
    display: 'flex',
    gap: 15,
  },
}))

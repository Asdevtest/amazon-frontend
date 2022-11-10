import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    color: theme.palette.text.general,
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
    color: theme.palette.text.general,
    marginTop: '30px',
    // width: '373px',
  },

  mainSubStepTwoTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
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

  buttonsWrapper: {
    display: 'flex',
    margin: '0 0 0 20px',
  },

  backBtn: {
    width: '211px',
    height: '42px',
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
    height: '225px',
    width: '100%',
    // overflowY: 'scroll',
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
    color: theme.palette.text.general,
  },

  chartSubLabel: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.text.general,
  },

  chartLabel: {
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.text.general,
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
    justifyContent: 'space-between',
    gap: '30px',
    // alignItems: 'center',
  },

  assetsAndFilesWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    // alignItems: 'center',
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
    color: theme.palette.text.general,
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
    marginLeft: '35px',
    marginTop: '18px',
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
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  mainTwoStepWrapper: {
    display: 'flex',
    flexDirection: 'column',
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
    marginTop: '40px',
  },

  stepPagination: {
    display: 'flex',
    alignItems: 'center',
  },

  stepPaginationBar: {
    height: '2px',
    width: '110px',
    backgroundColor: '#C4c4c4',
  },

  stepPaginationStartBar: {
    width: '12px',
    height: '12px',
    backgroundColor: '#00B746',
    borderRadius: '50%',
  },

  stepPaginationMiddleBar: {
    width: '12px',
    height: '12px',

    backgroundColor: '#c4c4c4',
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
    marginTop: '20px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.primary.main,
  },

  assetsPaper: {
    padding: '20px 15px',
    height: 220,
    overflow: 'auto',
  },

  dateIndicatorWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '32px',
    padding: '0 5px',
    borderRadius: '4px',
    marginBottom: '10px',
    backgroundColor: theme.palette.background.general,
  },

  indicatorWrapper: {
    border: '1px solid #C4C4C4',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    height: '32px',
    // padding: '0 5px',
    borderRadius: '4px',
    marginBottom: '10px',
    // // backgroundColor: theme.palette.,
  },

  assetInputWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0 15px 0 0',
    borderRadius: '4px',
    marginBottom: '10px',
  },

  assetInput: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: 280,
    border: 'none',
    margin: 0,
  },

  selectedRole: {
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // whiteSpace: 'nowrap',
    // width: '280px',
  },

  actionDelButton: {
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '22px',
    fontSize: '18px',
    backgroundColor: '#006CFF',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  disabledActionButton: {
    cursor: 'auto',
    opacity: 0.5,
    '&:hover': {
      transform: 'none',
    },
  },

  dateChartWrapper: {
    width: 200,
  },

  chartWrapper: {
    width: 170,
  },

  indicatorPaper: {
    // padding: '5px',
    minHeight: 520,
    width: '100%',
    // overflow: 'auto',
  },

  indicatorInput: {
    // width: 70,
    // margin: '0 5px',
    backgroundColor: theme.palette.background.general,
  },

  subLabelWrapper: {
    display: 'flex',
    margin: '0 0 10px',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    minHeight: 50,
  },

  chartSharedWrapper: {
    display: 'flex',
    gap: 20,
  },

  chartsMainWrapper: {
    display: 'flex',
    maxHeight: 640,
    // width: 'min-content',
    minWidth: 1050,
    overflow: 'auto',
  },

  chartContainer: {
    width: 'min-content',
  },

  divider: {
    margin: '0 20px',
  },

  totalsSubMainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  totalsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },

  // totalsSubWrapper: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  // },

  totalLabel: {
    fontSize: 14,
    whiteSpace: 'nowrap',

    color: theme.palette.text.second,
  },

  totalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    // width: 250,
    // width: 200,
    // width: 175,
    width: 'min-content',
  },

  totalText: {
    fontWeight: 600,
    fontSize: 18,

    color: theme.palette.text.general,
  },

  profitWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  totalsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginTop: 20,
  },

  totalsContainer: {
    height: '600px',
    minWidth: 400,
    // width: 700,
  },

  btnsWrapper: {
    marginTop: 220,
  },

  green: {
    color: 'green',
  },

  red: {
    color: 'red',
  },

  mainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  actionButton: {
    marginLeft: 8,
    width: '30px',
    height: '22px',
    fontSize: '18px',
    color: '#00B746',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  chartIcon: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  totalsPercentsWrapper: {
    marginTop: 40,
  },

  totalsPercentsContainer: {
    display: 'flex',

    width: 240,

    justifyContent: 'space-between',
  },

  percentWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}))

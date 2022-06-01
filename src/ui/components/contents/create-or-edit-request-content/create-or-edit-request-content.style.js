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
    justifyContent: 'space-between',
  },

  mainSubRightTwoStepWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  mainTitle: {
    fontWeight: '400',
    fontSize: '34px',
    lineHeight: '40px',
    color: '#354256',
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
    color: '#354256',
    marginTop: '30px',
    width: '373px',
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
    width: '377px',
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
    // justifySelf: 'flex-end',

    alignItems: 'center',
  },

  stepsWrapper: {
    display: 'flex',
  },

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
    minWidth: '210px',
  },

  successBtn: {
    marginLeft: '60px',
    minWidth: '210px',
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
  },

  descriptionField: {
    height: '81px',
    width: '100%',
    overflowY: 'hidden',
  },

  rightTwoStepSubFieldWrapper: {
    display: 'flex',
  },

  twoStepFieldResult: {
    minHeight: '40px',
    background: 'rgba(200,200,200, .1)',
  },

  twoStepDeadlineField: {
    marginLeft: '30px',
  },

  deadlineError: {
    borderBottom: '1px solid red',
  },
  deadlineErrorText: {
    color: 'red',
  },

  nameField: {
    height: '40px',
    width: '100%',
    overflowY: 'hidden',
  },

  spanLabel: {
    fontSize: '18px',
    fontWeight: 'bold',
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
    fontSize: '12px',
    color: 'red',
    position: 'absolute',
    top: '112px',
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    display: 'flex',
  },

  mainRightWrapper: {
    marginLeft: '150px',
    display: 'flex',
    flexDirection: 'column',
  },

  mainSubRightWrapper: {
    display: 'flex',
  },

  mainSubRightTwoStepWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  mainLeftWrapper: {
    width: '550px',
  },

  mainTitle: {
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#354256',
  },

  title: {
    marginBottom: '50px',
  },

  mainSubTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    color: '#354256',
    marginTop: '47px',
  },

  middleWrapper: {
    width: '577px',
  },

  rightWrapper: {
    width: '377px',
    marginLeft: '40px',
  },

  rightTwoStepWrapper: {
    width: '377px',
  },

  checkboxWrapper: {
    width: '377px',
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
  },

  footerWrapper: {
    display: 'flex',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',

    alignItems: 'flex-end',

    marginTop: '60px',
  },

  stepsWrapper: {
    display: 'flex',

    alignItems: 'center',
  },

  buttonsWrapper: {
    display: 'flex',
    margin: '20px 0 0 100px',
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

  footerRightWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  requestDescriptionField: {
    height: '400px',
    width: '100%',
    overflow: 'auto',
  },

  descriptionField: {
    height: '200px',
    width: '100%',
    overflow: 'auto',
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

  mainLeftSubWrapper: {
    display: 'flex',
  },

  middleSubWrapper: {
    width: '100%',
    display: 'flex',

    justifyContent: 'space-between',
  },

  dateWrapper: {
    marginLeft: '20px',
  },

  price: {
    color: '#006CFF',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
  },

  mainContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
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

  footerWrapper: {
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

  deadlineError: {
    borderBottom: '1px solid red',
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
}))

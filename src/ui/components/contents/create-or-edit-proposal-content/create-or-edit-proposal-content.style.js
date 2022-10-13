import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
  },

  mainRightWrapper: {
    width: '40%',
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
    width: '25%',
  },

  mainTitle: {
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '35px',
    color: theme.palette.text.second,
  },

  title: {
    marginBottom: '50px',
  },

  mainSubTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.second,
    marginTop: '47px',
  },

  rightWrapper: {
    width: '377px',
    marginLeft: '40px',
  },

  rightTwoStepWrapper: {
    width: '377px',
  },

  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: '20px',
  },

  footerWrapper: {
    display: 'flex',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',

    alignItems: 'flex-end',

    marginTop: '56px',
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
    width: '210px',
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
    maxHeight: '300px',
    width: '100%',
    overflow: 'auto',
  },

  descriptionField: {
    height: '115px',
    width: '100%',
  },

  rightTwoStepSubFieldWrapper: {
    display: 'flex',
  },

  standartText: {
    color: theme.palette.text.second,
  },

  twoStepFieldResult: {
    minHeight: '40px',
    background: 'rgba(200,200,200, .1)',

    color: theme.palette.text.second,
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
    color: theme.palette.primary.main,
  },

  photoWrapper: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  imgBox: {
    width: '200px',
    height: '130px',
    objectFit: 'contain',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  error: {
    color: 'red !important',
  },

  nameField: {
    height: '40px',
    width: '100%',
    overflowY: 'hidden',
  },

  adviceWrapper: {
    width: '25%',
  },
  adviceTitle: {
    fontSize: '30px',
    lineHeight: '35px',
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

  clientInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  userPhoto: {
    width: '60px',
    height: '60px',
    marginRight: '30px',
  },
  ratingWrapper: {
    display: 'flex',
    alignItems: 'center',

    '& > :first-child': {
      marginRight: '60px',
      fontSize: '16px',
      lineHeight: '19px',
      color: theme.palette.text.general,
    },
  },
  subTitle: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    marginTop: '10px',
    marginBottom: '30px',

    color: theme.palette.text.second,
  },

  spanLabel: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  imageFileInputTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  checkboxLabel: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
    marginRight: '83px',
  },

  nameFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',

    '& > span': {
      marginTop: '-20px',
    },
  },

  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',

    '& > span': {
      marginTop: '-20px',
    },
  },
  conditionsField: {
    width: '100%',
    fontSize: '16px',
    fontFamily: 'inherit',
    border: 'none',
    backgroundColor: 'inherit',
    resize: 'none',

    color: theme.palette.text.second,
  },
  listItemDot: {
    width: '8px !important',
  },
}))

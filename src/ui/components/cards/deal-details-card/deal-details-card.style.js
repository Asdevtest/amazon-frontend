import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    minHeight: '710px',

    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',

    display: 'flex',
    justifyContent: 'space-between',
    padding: '30px',
    backgroundColor: theme.palette.background.general,
  },

  leftBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  leftBlockMarginWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '80px',
  },

  nameWrapper: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '60px',

    marginLeft: '15px',
  },

  cardTitleBlockHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginTop: '56px',
  },

  cardTitle: {
    // margin: '0 10px 0 20px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    overflow: 'auto',
    height: 57,
  },

  cardDescription: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    marginTop: '10px',
    height: '57px',
    overflow: 'auto',
    marginRight: '20px',
  },

  usersInfoBlockWrapper: {
    display: 'flex',
    gap: '92px',
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  userInfoName: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '10px',
  },

  middleBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between',
  },

  timeItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  actionButton: {
    marginTop: 30,
    width: '242px',
    height: '40px',
  },

  cardPrice: {
    fontSize: '16px',
    lineHeight: '21px',
    color: theme.palette.primary.main,
  },

  subBlockWrapper: {
    width: '758px',
    padding: '30px 40px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSubBlockWrapper: {
    width: '301px',

    borderRadius: '8px',

    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },

  rightSubBlockWrapper: {
    width: '301px',

    borderRadius: '8px',

    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  result: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  resultDescription: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    height: '125px',
    maxWidth: '758px',
    overflow: 'auto',
  },
  filesAndTimeWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  filesWrapper: {
    width: '70%',
    minHeight: '100px',
  },
  timeOnReviewWrapper: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    gap: '15px',
  },

  timeOnReviewTitle: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  timeOnReview: {
    padding: '8px 16px 8px 56px',
    backgroundColor: theme.palette.background.green,

    color: theme.palette.text.general,
  },

  sumAndTimeWrapper: {
    width: '60%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  sumAndTimeTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  text: {
    color: theme.palette.text.general,
  },
}))

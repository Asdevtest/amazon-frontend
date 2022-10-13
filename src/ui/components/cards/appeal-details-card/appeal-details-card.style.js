import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: theme.palette.background.main,
  },

  cardWrapper: {
    width: '100%',
    height: '464px',

    display: 'flex',
    justifyContent: 'space-between',
    padding: '30px',
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
    height: '133px',
    // marginTop: '56px',
  },

  cardTitleBlockWrapper: {
    // width: '50%',
    // height: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },

  cardTitle: {
    // margin: '0 10px 0 20px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  cardDescription: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    marginTop: '10px',
    height: '57px',
  },

  cardSubTitle: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  leftBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  rightBlockWrapper: {
    marginLeft: '40px',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  divider: {
    width: '100%',
  },

  usersInfoBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
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

  userRating: {
    marginLeft: '100px',
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
    width: '242px',
    height: '40px',
  },

  cardPrice: {
    fontSize: '18px',
    lineHeight: '21px',

    color: theme.palette.primary.main,
  },

  statusText: {
    fontSize: '18px',
    lineHeight: '21px',
    color: '#00B746',
  },

  updatedAtWrapper: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
  },

  updatedAtText: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginRight: 5,
  },

  cardTitleBlockFooterWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: '325px',

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

  footerWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: '50px',
    alignItems: 'end',
  },

  timeOnReviewWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '15px',
  },

  timeOnReviewTitle: {
    width: '275px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.text.general,
  },

  timeOnReview: {
    padding: '8px 16px 8px 16px',
    backgroundColor: theme.palette.background.red,
  },

  chatWrapper: {
    padding: '30px',
    height: '900px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inProcess: {
    fontSize: '50px',
  },
}))

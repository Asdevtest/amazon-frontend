import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    height: '320px',
    borderRadius: '4px',

    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    display: 'flex',

    padding: '0 37px 0 20px',
  },

  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  cardTitleBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '40%',
    height: '100%',
    padding: '20px  25px 0 0',
  },

  cardTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    maxWidth: '420px',
    height: 50,
    marginBottom: '10px',
    textOverflow: 'ellipsis',
    overflow: 'auto',
  },

  cardDescription: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    maxHeight: 90,
    overflow: 'auto',
    minHeight: 100,

    maxWidth: '420px',
  },

  cardSubTitle: {
    color: theme.palette.text.general,
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
  },

  proposalComment: {
    marginTop: '30px',
    marginBottom: '39px',
    overflow: 'auto',
    maxHeight: '90px',

    color: theme.palette.text.second,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },

  rightBlockWrapper: {
    padding: '30px 0 30px 20px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
  },

  proposalWrapper: {
    width: '100%',
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  userRating: {
    marginLeft: '100px',
  },

  cardImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
    marginRight: '30px',
  },

  actionButton: {
    width: '242px',
    height: '52px',
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

  rightSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rightItemSubWrapper: {
    display: 'flex',
  },

  timeWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  timeCount: {
    marginLeft: '20px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
  },

  price: {
    marginLeft: '20px',
    color: theme.palette.text.general,
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
  },

  updatedAtWrapper: {
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  updatedAtText: {
    marginRight: '5px',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',

    color: theme.palette.text.second,
  },

  proposalFooter: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },

  mainContainer: {
    width: '100%',
  },

  window: {
    width: '100%',
    overflow: 'hidden',
  },

  allPages: {
    display: 'flex',

    transition: 'translate',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
  },

  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  carouselBtn: {
    backgroundColor: 'inherit',
  },
  headerCarouselWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  proposalCount: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
  },

  circleIndicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '10px',
  },

  statusField: {
    display: 'flex',
    alignItems: 'center',
  },

  timeAndPriceWrapper: {
    display: 'flex',
    width: '540px',
    justifyContent: 'space-between',
  },

  editAndOpenButtonWrapper: {
    display: 'flex',
    width: '530px',
    justifyContent: 'space-between',
    marginRight: '10px',
  },

  button: {
    padding: '10px 50px',
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '400',
  },

  ratingWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '16px',
  },

  rating: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.text.general,
    marginRight: '20px',
  },

  conditionsInput: {
    height: 'auto',

    width: '100%',
    border: 'none',
    color: theme.palette.text.general,
  },

  conditionsField: {
    height: '100px',
    overflow: 'auto',
  },
  divider: {
    minHeight: '293px',
    marginTop: '20px',
    marginBottom: '20px',
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
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
    color: '#001029',
    maxWidth: '420px',
    marginBottom: '10px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  cardDescription: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    maxHeight: '100px',
    overflowY: 'auto',
    // marginBottom: '36px',
  },

  cardSubTitle: {
    // marginBottom: '20px',
    color: '#001029',
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
  },

  proposalComment: {
    marginTop: '30px',
    marginBottom: '39px',
    // maxWidth: '720px',
    overflow: 'auto',
    maxHeight: '90px',
  },

  rightBlockWrapper: {
    padding: '30px 0 30px 20px',
    // marginLeft: '40px',
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

    // marginBottom: '30px',
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
    color: '#006CFF',
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
    color: '#001029',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
  },

  price: {
    marginLeft: '20px',
    color: '#001029',
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
    width: '500px',
    justifyContent: 'space-between',
  },

  editAndOpenButtonWrapper: {
    display: 'flex',
    width: '500px',
    justifyContent: 'space-between',
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
    color: '#001029',
    marginRight: '20px',
  },
}))

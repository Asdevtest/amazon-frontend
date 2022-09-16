import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  cardMainWrapper: {
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    padding: '30px 40px',
  },

  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userInfoMainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  cardImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  userInfoWrapper: {
    display: 'flex',
    marginBottom: '20px',
  },
  userWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  actionButtonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    gap: '10px',
  },

  actionButton: {
    minWidth: '240px',
  },

  cancelBtn: {
    backgroundColor: '#F44336',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },

  successBtn: {
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  timeInfoWrapper: {
    width: '300px',
  },

  timeItemInfoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  cardPrice: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#001029',
  },

  cardPriceValue: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },

  cardTime: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#001029',
  },

  cardTimeValue: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#001029',
  },

  successDeals: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },

  userRating: {
    marginLeft: '49px',
  },

  userNameWrapper: {
    marginLeft: '10px',

    '& > :first-child': {
      marginBottom: '13px',
    },
  },

  proposalDescription: {
    width: '100%',
    marginTop: '10px',
    height: '110px',
    overflow: 'auto',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#001029',
  },

  proposalDescriptionWrapper: {
    display: 'flex',
  },

  imgBox: {
    width: '100%',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  photoWrapper: {
    marginLeft: '60px',
    width: '391px',
    height: '152px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoSubWrapper: {
    width: '391px',
    height: '182px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  cardContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardSubContentWrapper: {
    width: '100%',
  },
  circleIndicator: {
    display: 'block',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },

  statusField: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '500px',

    '& > span': {
      marginRight: '19px',
    },
  },

  reviewWrapper: {
    display: 'flex',
  },

  reviews: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: '#006CFF',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  cardMainWrapper: {
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '4px',
    boxShadow: theme.palette.boxShadow.paper,
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
    marginTop: 15,
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
    color: theme.palette.text.general,
  },

  cardPriceValue: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  cardTime: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  cardTimeValue: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },

  successDeals: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  userRating: {
    marginLeft: '49px',
    opacity: '1 !important', // undisabled style
  },

  userNameWrapper: {
    marginLeft: '10px',

    '& > :first-of-type': {
      marginBottom: '13px',
    },
  },

  proposalTitle: {
    width: '100%',
    marginTop: '10px',
    overflow: 'auto',
    color: theme.palette.text.general,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '140%',
  },

  proposalDescription: {
    width: '100%',
    marginTop: '10px',
    height: '60px',
    overflow: 'auto',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
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
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  standartText: {
    color: theme.palette.text.general,
  },
}))

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    minHeight: '373px',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    padding: '30px 20px ',
  },

  cardTitleBlockWrapper: {
    marginBottom: '20px',
  },

  cardTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '20px',
    height: '50px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  cardSubTitle: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    color: theme.palette.text.second,
    marginTop: '10px',
  },

  cardActionBlockWrapper: {
    padding: '10px 0 0 0',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  divider: {
    width: '100%',
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: '10px',
  },

  timeInfoWrapper: {
    width: '100%',
    margin: '20px 0',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardImg: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    objectPosition: 'center',
    marginRight: '5px',
  },

  actionButton: {
    width: '254px',
    height: '40px',
  },

  cardPrice: {
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: '600',
    color: theme.palette.primary.main,
  },

  cardTime: {
    fontSize: '14px',
    lineHeight: '16px',
    color: theme.palette.text.second,
  },

  nameRatingWrapper: {
    marginLeft: '10px',
  },

  updatedAtWrapper: {
    marginTop: 'auto',
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',

    '& > :first-of-type': {
      marginRight: '5px',
    },
  },

  updatedAtText: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  deadline: {
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  timeWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  statusWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '17px',
  },

  statusText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    color: theme.palette.text.second,
  },

  mainInfosWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: 300,
  },

  fieldLabel: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  fieldContainer: {
    minHeight: 55,
  },

  priceAmazonWrapper: {
    display: 'flex',
  },

  redText: {
    color: '#FB1D5B',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
  },

  cashBackPrice: {
    marginLeft: 5,
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: '#656565',
    textDecorationLine: 'line-through',
  },
}))

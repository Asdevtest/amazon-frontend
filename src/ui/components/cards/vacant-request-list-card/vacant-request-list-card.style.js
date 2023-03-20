import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    height: 200,

    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    alignItems: 'start',
    justifyContent: 'space-between',
  },

  cardTitleBlockWrapper: {
    width: '661px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  cardTitle: {
    // margin: '0 10px 0 20px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    overflowY: 'auto',
    width: '395px',
    height: 80,
  },

  cardSubTitle: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.second,
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

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: '30px',
  },

  userRating: {
    marginLeft: '100px',
  },

  middleBlockWrapper: {
    width: '819px',

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
    fontSize: '16px',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSubBlockWrapper: {
    width: '403px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },

  rightSubBlockWrapper: {
    width: '377px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  standartText: {
    color: theme.palette.text.general,
  },

  fieldLabel: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  fieldContainer: {
    minHeight: 55,
    marginBottom: '25px !important',

    '&:last-child': {
      marginBottom: '0px !important',
    },
  },

  mainInfosWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    // margin: '0px auto',
    gap: '7%',
    // height: 300,
    paddingRight: 30,
  },

  priceAmazonWrapper: {
    display: 'flex',
  },

  redText: {
    color: '#FB1D5B',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },

  cashBackPrice: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    // color: '#656565',
  },

  accentText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  mainInfosSubWrapper: {
    width: 180,
  },
}))

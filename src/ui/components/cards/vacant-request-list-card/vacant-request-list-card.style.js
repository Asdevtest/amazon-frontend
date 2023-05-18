import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    height: 200,

    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    backgroundColor: theme.palette.background.general,

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
  },

  cardSubTitle: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: '30px',
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

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
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

  titleWrapper: {
    display: 'flex',

    overflowY: 'auto',
    width: '395px',
    height: 80,
  },

  idTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.general,
  },

  idText: {
    color: `${theme.palette.text.second} !important`,
  },
}))

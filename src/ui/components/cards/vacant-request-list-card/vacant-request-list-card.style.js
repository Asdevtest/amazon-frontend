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
    background: theme.palette.background.general,

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
    width: 130,
    height: 40,
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
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    gap: '7%',
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

  emptyDiv: {
    width: 100,
  },

  priorityWrapper: {
    minWidth: 20,
    minHeight: 20,
    marginRight: 20,
    marginBottom: 5,
  },

  priorityIcon: {
    width: 20,
    height: 20,
  },

  yellowBackground: {
    background: `${theme.palette.background.yellowRow} !important`,
    border: '2px solid #C69109',
  },

  redBackground: {
    background: `${theme.palette.background.redRow} !important`,
    border: '2px solid #D70D0D',
  },

  yellowColor: {
    color: `#C69109`,
  },

  redColor: {
    color: `#D70D0D`,
  },
}))

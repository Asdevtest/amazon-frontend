import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    // minHeight: '373px',
    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    backgroundColor: theme.palette.background.general,
    padding: '30px 20px ',
    width: 300,
    height: 500,
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  cardTitleBlockWrapper: {
    marginBottom: '10px',
  },

  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '20px',
    // height: '50px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
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
    height: 280,
  },

  fieldLabel: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  fieldContainer: {
    minHeight: 55,
    marginBottom: '10px !important',
  },

  priceAmazonWrapper: {
    display: 'flex',
    // flexWrap: 'nowrap',
    maxWidth: 150,
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

  rightLieldLabel: {
    textAlign: 'right',
    justifySelf: 'end',
    margin: '0 0 12px auto !important',
  },

  rightText: {
    textAlign: 'right',
  },

  dontWrapText: {
    whiteSpace: 'nowrap',
  },

  idWrapper: {
    display: 'flex',
    gap: 5,
  },

  idTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,
  },

  idText: {
    color: theme.palette.text.general,
  },
}))

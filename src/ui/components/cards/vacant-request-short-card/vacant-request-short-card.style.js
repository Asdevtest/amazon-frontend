import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    background: theme.palette.background.general,
    padding: '30px 20px ',
    width: 300,
    height: '100%',
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

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: '10px',
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

  nameRatingWrapper: {
    marginLeft: '10px',
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

  idAndPriorityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 5,
  },

  priorityIcon: {
    width: 16,
    height: 18,
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

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    width: '100%',
    borderRadius: '4px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px',
    gap: '60px',
  },

  cardTitleBlockHeaderWrapper: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: '10px',
  },

  cardTitleBlockWrapper: {
    alignContent: 'space-between',
    gap: '10px',
    maxWidth: '661px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 320,
  },

  cardSubTitle: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.second,

    span: {
      fontWeight: '600',
    },
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
    alignSelf: 'flex-end',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '10px',
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
    gap: 5,
    width: '395px',
  },

  requestInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  requestTermsWrapper: {
    width: 'fit-content',
    flex: '1 1 auto',

    '& > div': {
      justifyContent: 'flex-start',
      gap: '20px 70px',
    },
  },

  productInfo: {
    width: 'fit-content',
    minWidth: 256,
  },

  idTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.general,
  },

  emptyDiv: {
    width: 100,
  },

  priorityWrapper: {
    height: 'fit-content',
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

  controls: {
    height: '100%',
    maxHeight: 107,
    display: 'flex',
    alignItems: 'flex-end',
  },
}))

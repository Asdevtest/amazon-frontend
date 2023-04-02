import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    height: 147,
    borderRadius: 8,

    background: theme.palette.background.general,

    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    display: 'flex',

    padding: '20px 30px',
  },

  cardSubTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 48,

    gap: 10,
  },

  nameWrapper: {
    display: 'flex',
  },

  cardTitleBlockWrapper: {
    display: 'flex',
    // justifyContent: 'space-between',
    width: '50%',
    height: '100%',

    paddingRight: 30,
  },

  cardTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '140%',
    color: theme.palette.text.general,
    maxWidth: 452,
    maxHeight: 38,
    // marginBottom: '10px',

    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  cardDescription: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    maxHeight: 90,
    overflow: 'auto',
    minHeight: 100,

    maxWidth: '420px',
  },

  cardSubTitle: {
    color: theme.palette.text.second,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
  },

  withoutСonfirmation: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    background: theme.palette.background.greenGradient,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },

  standartText: {
    color: theme.palette.text.general,
  },

  cancelBtn: {
    padding: '0 17px',
  },

  rightBlockWrapper: {
    paddingLeft: 30,
    display: 'flex',
    width: '50%',
  },

  proposalWrapper: {
    width: '100%',
    height: '85px !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  userInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between',

    width: '40%',
  },

  userRating: {
    marginLeft: '100px',
  },

  cardImg: {
    width: 38,
    height: 38,
    objectFit: 'contain',
    objectPosition: 'center',
    marginRight: 10,
  },

  actionButton: {
    width: '242px',
    height: '52px',
  },

  cardPrice: {
    fontSize: '18px',
    lineHeight: '21px',
    color: theme.palette.primary.main,
  },

  statusText: {
    fontSize: '18px',
    lineHeight: '21px',
    color: '#00B746',
  },

  rightSubWrapper: {
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rightBlockSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
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
    color: theme.palette.text.general,
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  price: {
    marginLeft: '20px',
    color: theme.palette.text.general,
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

    color: theme.palette.text.second,
  },

  proposalFooter: {
    display: 'flex',
    width: 'fit-content',
    gap: 25,

    justifyContent: 'flex-end',
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
    width: '540px',
    justifyContent: 'space-between',
  },

  editAndOpenButtonWrapper: {
    display: 'flex',
    gap: 20,

    marginRight: 10,
  },

  button: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    height: 30,
    borderRadius: 4,

    padding: '0 25px',
  },

  ratingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  rating: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.text.general,
    marginRight: '20px',
  },

  conditionsInput: {
    height: 'auto',

    width: '100%',
    border: 'none',
    color: theme.palette.text.general,
  },

  conditionsField: {
    height: 'auto',
    overflow: 'auto',
  },
  divider: {
    height: 107,
  },

  cardTitleBlockSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  accentText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },

  fieldLabel: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
  },

  rightLieldLabel: {
    textAlign: 'right',
    justifySelf: 'end',
    margin: '0 0 12px auto !important',
  },

  fieldContainer: {
    minHeight: 55,
    marginBottom: '25px !important',

    width: 'min-content',

    '&:last-child': {
      marginBottom: '0px !important',
    },
  },

  customUserLink: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: `${theme.palette.primary.main} !important`,
  },
  moreInfoBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between',

    width: '60%',
  },

  blockInfoCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  blockInfoCellTitle: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,
  },
  darkBlue: {
    color: theme.palette.primary.main,
  },
  blockInfoCellText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.main,
  },
  moreInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    width: '100%',
  },
  performerInfoCell: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  customPerformerLink: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '22px',

    color: theme.palette.primary.main,
  },
}))

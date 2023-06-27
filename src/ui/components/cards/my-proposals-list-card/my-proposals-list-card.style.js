import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
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
    width: '91%',
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

  cardImg: {
    width: 38,
    height: 38,
    objectFit: 'contain',
    objectPosition: 'center',
    marginRight: 10,
  },

  rightBlockSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  proposalFooter: {
    display: 'flex',
    width: 'fit-content',
    gap: 15,

    justifyContent: 'flex-end',
  },

  circleIndicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },

  statusField: {
    display: 'flex',
    alignItems: 'center',

    gap: 10,
  },

  editAndOpenButtonWrapper: {
    display: 'flex',
    gap: 15,

    marginRight: 10,
  },

  button: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    height: 30,
    borderRadius: 4,

    padding: '0 25px',

    whiteSpace: 'nowrap',
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
  divider: {
    height: 107,
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

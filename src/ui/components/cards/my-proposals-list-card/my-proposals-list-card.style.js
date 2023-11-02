import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    padding: 20,
    display: 'flex',
    gap: 20,
    borderRadius: 8,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
  },

  cardTitleBlockWrapper: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  userInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    width: '100%',
    maxWidth: 260,
  },

  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  cardImg: {
    width: 38,
    height: 38,
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '50%',
  },

  ratingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  customUserLink: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: `${theme.palette.primary.main} !important`,
  },

  cardSubTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  cardSubTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  withoutConfirmation: {
    fontSize: 14,
    lineHeight: '19px',
    background: theme.palette.background.greenGradient,

    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  moreInfoBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  cardTitle: {
    fontSize: 14,
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  moreInfoWrapper: {
    display: 'flex',
    gap: 40,
  },

  blockInfoCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  blockInfoCellTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  blockInfoCellText: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.main,
  },

  divider: {
    width: '1px',
    height: '100%',
    background: '#E0E0E0',
  },
}))

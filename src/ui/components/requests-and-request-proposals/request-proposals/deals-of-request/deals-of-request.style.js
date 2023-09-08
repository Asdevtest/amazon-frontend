import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    marginBottom: '30px',
  },

  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  accordion: {
    width: '100%',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    borderRadius: 4,
  },

  title: {
    paddingLeft: 14,
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: theme.palette.text.second,
  },

  dealWrapper: {
    display: 'flex',
    borderTop: '1px solid rgba(0,0,0, .1)',
    borderBottom: '1px solid rgba(0,0,0, .1)',
    width: '100%',
    padding: '18px 0px',
    justifyContent: 'space-between',
  },

  userInfoWrapper: {
    display: 'flex',
    width: '300px',
  },

  cardImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  userNameWrapper: {
    marginLeft: '10px',
  },

  userRating: {
    marginLeft: '5px',
    opacity: '1 !important', // undisabled style
  },

  userRatingWrapper: {
    marginLeft: '20px',
    display: 'flex',
  },

  blockInfoWrapper: {
    minWidth: '245px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
  },

  requestItemInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    gap: '10px',
  },

  requestStatusWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  requestStatus: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '15px',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#00B746',
    '& > span': {
      display: 'block',
      width: '13px',
      height: '13px',
      borderRadius: '50%',
      marginRight: '10px',
    },
  },

  price: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '21px',
    color: theme.palette.primary.main,
  },

  blockInfoStatusWrapper: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
  },

  blockText: {
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  reviews: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.primary.main,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  standartText: {
    color: theme.palette.text.general,
  },
}))

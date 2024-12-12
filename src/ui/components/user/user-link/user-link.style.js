import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  linkText: {
    width: '100%',
    color: theme.palette.primary.main,
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: '400',
    cursor: 'pointer',
    transition: '.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      opacity: '0.8',
    },
  },

  blackLinkText: {
    color: theme.palette.text.general,
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '.3s ease',
    maxWidth: '100px',
    textAlign: 'end',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      opacity: '0.8',
    },
  },

  blueLinkText: {
    color: theme.palette.primary.main,
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '.3s ease',
    maxWidth: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      opacity: '0.8',
    },
  },

  customStyles: {
    fontWeight: '600',
  },

  avatarWrapper: {
    marginRight: 10,

    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      opacity: '0.8',
    },
  },

  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 'min-content',
    width: 'min-content',
  },

  userInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

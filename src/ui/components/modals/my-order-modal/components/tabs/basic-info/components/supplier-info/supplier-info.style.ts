import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 280,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontWeight: 600,
  },

  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  fieldText: {
    fontSize: 14,
    lineHeight: '23px',
    color: theme.palette.text.general,

    '&:hover': {
      opacity: 1,
    },
  },

  switcher: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  link: {
    color: theme.palette.primary.main,
    opacity: 1,
    transition: '.3s ease-in-out',
    maxWidth: 140,
    wordBreak: 'break-all',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',

    '&:hover': {
      opacity: 0.8,
    },
  },

  inputAmount: {
    width: 100,
    padding: '1px 5px',
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'right',
    background: theme.palette.background.general,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    border: `1px solid ${theme.palette.background.second}`,
    borderRadius: 6,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },

  barCodeValueContainer: {
    display: 'flex',
    gap: 5,
  },

  pencinButton: {
    width: 18,
    height: 18,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
      transform: 'scale(1.1)',
    },
  },

  pencilIcon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.primary.main,
  },
}))

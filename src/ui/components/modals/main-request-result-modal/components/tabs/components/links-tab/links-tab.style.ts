import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  links: {
    height: 173,
    overflow: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(auto-fill), 1fr)',
    alignContent: 'start',
    gap: 13,
  },

  clientLinks: {
    height: 215,
  },

  linkContainer: {
    width: 285,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  addLinkContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  inputRoot: {
    height: 32,
    flexShrink: 1,
  },

  addInput: {
    width: 230,
  },

  notFocuced: {
    '&.Mui-focused': {
      border: `1px solid ${theme.palette.input.customBorder}`,
    },
  },

  error: {
    border: `1px solid ${theme.palette.text.red}`,

    '&.Mui-focused': {
      border: `1px solid ${theme.palette.text.red}`,
    },
  },

  input: {
    padding: 5,
    fontSize: 14,
    lineHeight: '19px',
  },

  link: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
  },

  button: {
    minWidth: 'max-content',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: theme.palette.primary.main,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },

  iconBasket: {
    width: '18px !important',
    height: '18px !important',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  iconPlus: {
    padding: 2,
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.primary.main,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  changeInputComment: {
    width: '100%',
    whiteSpace: 'pre-wrap',
    overflow: 'auto',
    fontSize: 14,
    lineHeight: '19px',
    padding: 0,

    '&::placeholder': {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  CopyLinkWrapper: {
    width: '100%',

    display: 'flex',
    gap: 5,
  },

  linkText: {
    width: 'fit-content',
    maxWidth: 'calc(100% - 25px)',
  },

  linkTextClass: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    color: theme.palette.primary.main,
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 400,

    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },
}))

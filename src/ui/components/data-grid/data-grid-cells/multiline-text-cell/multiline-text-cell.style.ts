import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  multilineTextWrapper: {
    width: '100%',
    padding: '10px 0',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  illuminationCell: {
    backgroundColor: theme.palette.background.green,
  },

  multilineText: {
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '14px',
    lineHeight: '19px',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },

  multilineLeftAlignText: {
    textAlign: 'left',
  },

  multilineLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',

    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
      textDecoration: 'underline',
    },
  },

  oneMultilineText: {
    height: 19,
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  twoMultilineText: {
    maxHeight: 38,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  threeMultilineText: {
    maxHeight: 57,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}))

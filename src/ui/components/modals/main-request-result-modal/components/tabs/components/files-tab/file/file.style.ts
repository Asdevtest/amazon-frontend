import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  fileContainer: {
    width: 109,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  checkboxWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },

  checkbox: {
    padding: 0,
    borderRadius: '0 5px 0 6px',
    background: theme.palette.background.general,

    '&:hover': {
      background: theme.palette.background.general,
    },
  },

  button: {
    width: 20,
    height: 20,
    transition: '.3s ease',
    opacity: 1,

    '&:hover': {
      opacity: 0.8,
    },
  },

  file: {
    height: 109,
    width: 109,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 6,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    cursor: 'pointer',
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  commenButton: {
    padding: '2px 0',
    width: 109,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    overflow: 'hidden',
  },

  icon: {
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.primary.main,
  },

  plusIcon: {
    padding: 2,
  },

  commentText: {
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.primary.main,
  },

  inputRoot: {
    height: 30,
    flexShrink: 1,
  },

  input: {
    padding: 5,
    fontSize: 12,
    lineHeight: '16px',

    '&::placeholder': {
      fontSize: 11,
      lineHeight: '15px',
    },
  },

  notFocuced: {
    '&.Mui-focused': {
      border: `1px solid ${theme.palette.input.customBorder}`,
    },
  },

  pasteInput: {
    height: 109,
    width: 109,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    borderRadius: 6,
  },

  fileName: {
    width: 109,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'default',
  },

  notCommentText: {
    fontSize: '12px',
    lineHeight: '20px',
  },
}))

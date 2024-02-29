import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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
}))

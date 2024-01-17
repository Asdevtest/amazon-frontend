import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 300,
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

  userMiniCellWrapper: {
    padding: 0,
  },

  userMiniCellAvatar: {
    width: 19,
    height: 19,
  },

  tafiffButton: {
    width: 140,
    padding: '2px 4px',
    display: 'flex',
    justifyContent: 'center',
    gap: 5,
    background: theme.palette.primary.main,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    borderRadius: 6,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'auto',
    },
  },

  tafiffText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: '19px',
    width: '100%',
    maxWidth: 'max-content',
    overflow: 'hidden',
    wordBreak: 'break-all',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  inputDeadline: {
    width: 140,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    borderRadius: 6,

    div: {
      padding: '2px 5px 2px 10px',
      borderRadius: 6,

      input: {
        height: 19,
        padding: 0,
        fontSize: 14,
        lineHeight: '19px',
        background: theme.palette.background.general,
        cursor: 'text',
      },
    },
  },
}))

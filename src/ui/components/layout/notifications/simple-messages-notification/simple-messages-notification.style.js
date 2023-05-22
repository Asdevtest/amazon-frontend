import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    cursor: 'pointer',
    display: 'flex',
    flexWrap: 'wrap',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  messageText: {
    marginTop: 5,
    color: theme.palette.text.general,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflow: 'hidden',
    minHeight: 50,
    maxHeight: 150,
    minWidth: 150,
    maxWidth: 250,
  },

  filesText: {
    color: theme.palette.text.second,
    marginTop: 10,
  },

  messageDate: {
    fontSize: 12,
    marginRight: '-20px',
    marginTop: '-18px',
    color: theme.palette.text.second,
  },

  avatarWrapper: {
    width: 53,
    height: 53,
    marginRight: 20,
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },

  centerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

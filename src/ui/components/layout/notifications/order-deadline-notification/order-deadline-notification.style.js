import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  itemWrapper: {
    padding: 5,
    borderRadius: 10,
    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(0.99)',
      backgroundColor: theme.palette.background.second,
    },
  },

  titleWrapper: {
    display: 'flex',
  },

  attentionTitle: {
    color: '#FF1616',
    fontSize: 14,
    fontWeight: 600,
    marginRight: 5,
  },

  title: {
    color: theme.palette.text.general,
    fontSize: 14,
    fontWeight: 600,
  },

  messageText: {
    marginTop: 5,
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
    minHeight: 25,
    maxHeight: 150,
    minWidth: 150,
    maxWidth: 320,
  },

  avatarWrapper: {
    width: 53,
    height: 53,
    marginRight: 20,
  },

  centerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 10,
  },

  centerSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '25vh',
    height: '100%',
    p: {
      maxWidth: 'unset',
    },
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },

  messageDate: {
    fontSize: 12,
    marginRight: '-20px',
    marginTop: '-18px',
    color: theme.palette.text.second,
  },
}))

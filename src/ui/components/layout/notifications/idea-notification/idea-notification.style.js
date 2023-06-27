import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  itemWrapper: {
    borderRadius: 10,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  attentionTitle: {
    color: '#FF1616',
    fontSize: 14,
    fontWeight: 600,
    marginRight: 5,
  },

  messageText: {
    marginLeft: 5,
    color: theme.palette.text.general,
    whiteSpace: 'pre-wrap',
    width: 'auto',
    display: 'flex',
  },

  asin: {
    fontSize: '14px',
    lineHeight: '21px',
    color: 'rgba(189, 194, 209, 1)',
  },

  asinText: {
    marginLeft: 5,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '.3s ease',
    '&: hover': {
      opacity: '.8',
    },
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
  },

  centerSubWrapper: {
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '25vh',
    height: '100%',
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

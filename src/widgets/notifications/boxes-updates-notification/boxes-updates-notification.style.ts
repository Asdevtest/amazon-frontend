import { makeStyles } from 'tss-react/mui'

export const useBoxNotificationStyles = makeStyles()(theme => ({
  body: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
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
    paddingRight: '15px',
    width: '100%',
  },
  attentionTitle: {
    color: '#FF1616',
    fontSize: 14,
    fontWeight: 600,
    marginRight: 5,
    marginBottom: 20,
  },
  listWrapper: {
    width: '100%',
    listStyle: 'none',
    paddingInlineStart: '0 !important',
    margin: 'unset',
    maxHeight: '25vh',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    paddingRight: 10,
  },
  listItem: {
    width: '100%',
    listStyle: 'none',
    paddingInlineStart: '0 !important',
    display: 'flex',
    flexDirection: 'column',
    a: {
      cursor: 'pointer',
      textDecoration: 'none',
    },
    p: {
      margin: 0,
      fontSize: 14,
      color: theme.palette.text.general,
    },
    '& > p': {
      marginBottom: 5,
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

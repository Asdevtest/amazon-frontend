import { makeStyles } from 'tss-react/mui'

export const useOrdersUpdatesNotificationStyle = makeStyles()(theme => ({
  body: {
    display: 'flex',
    flexWrap: 'wrap',
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
    paddingRight: '5px',
    maxHeight: '25vh',
    gap: 15,
  },
  attentionTitle: {
    color: '#FF1616',
    fontSize: 14,
    fontWeight: 600,
    marginRight: 5,
  },
  list: {
    overflow: 'auto',
    flex: 1,
  },
  listWrapper: {
    listStyle: 'none',
    paddingInlineStart: '0 !important',
    margin: 'unset',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  listTitle: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: '400',
    paddingBottom: '10px',
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.general,
  },
  listItem: {
    listStyle: 'none',
    paddingInlineStart: '0 !important',
    display: 'flex',
    gap: '10px',

    div: {
      color: theme.palette.text.general,

      span: {
        color: theme.palette.text.second,
      },
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

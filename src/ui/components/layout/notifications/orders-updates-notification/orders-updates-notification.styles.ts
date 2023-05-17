import {makeStyles} from 'tss-react/mui'

export const useOrdersUpdatesNotificationStyle = makeStyles()(theme => ({
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
}))

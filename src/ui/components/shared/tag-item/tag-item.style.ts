import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tagListItem: {
    height: '30px',
    maxWidth: '190px',
    padding: '5px 10px 5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    background: theme.palette.background.chatMyMessage,
    borderRadius: '100px',
  },

  tagWrapper: {
    display: 'flex',
  },

  textTag: {
    fontSize: '14px',
    color: theme.palette.text.general,
  },

  widthLimitation: {
    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },

  removeTeg: {
    cursor: 'pointer',

    svg: {
      height: 10,
      width: 10,
    },
  },
}))

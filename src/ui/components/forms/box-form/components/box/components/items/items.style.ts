import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 215,
    height: 215,
    padding: 2.5,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    flexBasis: 'content',
  },

  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },

  photoWrapper: {
    width: 50,
    height: 50,
    borderRadius: 7,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
  },

  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 7,
  },

  info: {
    width: 145,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,

    'p, a': {
      fontSize: 12,
      lineHeight: '16px',
    },
  },

  text: {
    fontSize: 12,
    lineHeight: '16px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  blueText: {
    color: theme.palette.primary.main,
  },
}))

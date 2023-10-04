import { makeStyles } from 'tss-react/mui'

export const useChatInfoHeaderStyles = makeStyles()(theme => ({
  chatHeader: {
    position: 'relative',
    height: 178,

    [theme.breakpoints.down(768)]: {
      height: 143,
    },
  },

  chatAvatar: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  chatHeaderOverlay: {
    position: 'absolute',
    maxHeight: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 65%, rgba(0, 0, 0, 0.7) 100%)',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 10px',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },

  chatTitle: {
    color: '#fff',
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  chatSubTitle: {
    color: '#fff',
    fontSize: 12,
    lineHeight: '16px',
  },

  pencilEditIcon: {
    transition: '.3s ease',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    marginTop: '-24px',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))

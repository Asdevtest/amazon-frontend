import { makeStyles } from 'tss-react/mui'

export const useChatInfoHeaderStyles = makeStyles()(theme => ({
  chatHeader: {
    position: 'relative',
    maxHeight: 178,

    img: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
  chatHeaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 10px',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.negativeMain,
  },
  chatSubTitle: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.palette.text.negativeMain,
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

import { makeStyles } from 'tss-react/mui'

export const useChatMessageFileStyles = makeStyles()(theme => ({
  wrapper: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
  },

  fileWrapper: {
    display: 'flex',
    gap: '10px',
    cursor: 'pointer',
  },

  logo: {
    width: '30px',
    height: '40px',

    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',

    p: {
      margin: '0',
      fontSize: 14,
      lineHeight: 1,
      color: theme.palette.text.general,
    },
  },
  fileName: {
    maxWidth: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  fileSize: {
    color: theme.palette.text.second,
    fontSize: 12,
  },
  fileType: {},
}))

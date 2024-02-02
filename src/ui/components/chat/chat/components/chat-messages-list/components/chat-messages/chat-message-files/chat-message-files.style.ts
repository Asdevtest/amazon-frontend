import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
  },

  fileWrapper: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },

  logo: {
    width: '30px',
    height: '40px',

    'img, > div': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },

  fileIcon: {
    width: '30px !important',
    height: '40px !important',
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
  },

  nameWrapper: {
    display: 'flex',

    p: {
      fontSize: 14,
      lineHeight: '19px',
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
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.second,
  },
}))

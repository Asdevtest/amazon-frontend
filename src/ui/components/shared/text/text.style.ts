import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',

    '& > div': {
      minHeight: '16px',
    },
  },

  cell: {
    height: '100%',
    padding: '5px 0 5px 5px',
  },

  popconfirm: {
    width: '400px',

    '.ant-popconfirm-message-text': {
      width: '100%',
    },
  },

  multilineLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    margin: '0 auto !important',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
      textDecoration: 'underline',
    },
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    minHeight: '16px',
    height: '100%',
  },

  icon: {
    position: 'absolute',
    top: '5px',
    left: '-10px',
    fontSize: '14px',
  },

  error: {
    color: theme.palette.text.red,
  },

  link: {
    color: theme.palette.primary.main,
  },
}))

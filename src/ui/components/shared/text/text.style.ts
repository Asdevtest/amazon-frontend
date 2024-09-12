import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',

    '& > div': {
      minHeight: '16px',
    },
  },

  cell: {
    padding: '5px 0 5px 5px',
  },

  popconfirm: {
    width: '400px',

    '.ant-popconfirm-message-text': {
      width: '100%',
    },
  },

  container: {
    minHeight: '22px',
    height: '100%',
    alignContent: 'center',
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

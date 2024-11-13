import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    position: 'relative',
  },

  cell: {
    width: '100%',
    height: '100%',
    padding: '5px 0 5px 5px',
  },

  popconfirm: {
    width: '400px',

    '.ant-popconfirm-message-text': {
      width: '100%',
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
}))

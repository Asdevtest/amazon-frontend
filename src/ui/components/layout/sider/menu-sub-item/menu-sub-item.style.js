import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  menuItem: {
    borderRadius: '0px',

    '.ant-btn-icon, .ant-badge': {
      overflow: 'visible',
    },

    '.ant-badge-status': {
      marginRight: 'auto',
    },

    '.ant-badge-count': {
      padding: '0 4px',
    },
  },

  text: {
    color: theme.palette.text.general,
    fontSize: '14px',
  },
}))

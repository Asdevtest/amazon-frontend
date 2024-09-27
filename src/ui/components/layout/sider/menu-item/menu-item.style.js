import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  menuItem: {
    borderRadius: '0px',

    '.ant-btn-icon, .ant-badge': {
      overflow: 'visible',
    },
  },

  text: {
    color: theme.palette.text.general,
    marginRight: 'auto',
    fontSize: '14px',
  },
}))

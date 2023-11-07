import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  statusWrapper: {
    display: 'flex',
    justifyContent: 'start',
  },

  statusText: {
    width: '100%',
    textAlign: 'right',
  },

  statusTextChat: {
    fontSize: '18px',

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },
}))

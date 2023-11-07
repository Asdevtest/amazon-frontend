import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  notificationId: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}))

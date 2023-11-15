import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  batchTrackingWrapper: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },

  batchTrackingContainer: {
    margin: '0 !important',
  },

  batchTrackingTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
    margin: '0 !important',
  },
}))

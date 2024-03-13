import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: 300,
    // maxWidth: 1085,
  },

  columnHeaderTitleContainer: {
    padding: '0 !important',
  },

  row: {
    position: 'relative',
  },

  currentSupplierBackground: {
    background: theme.palette.background.tableCurRow,
  },
}))

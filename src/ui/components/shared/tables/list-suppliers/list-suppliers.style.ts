import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%', //  высоту задавать внешнему контейнеру
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

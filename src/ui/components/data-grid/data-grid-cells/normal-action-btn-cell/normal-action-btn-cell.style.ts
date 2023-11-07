import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  actionBtn: {
    height: 30,
    padding: '0 15px',

    [theme.breakpoints.down(1282)]: {
      fontSize: 13,
      lineHeight: 18,
    },
  },
}))

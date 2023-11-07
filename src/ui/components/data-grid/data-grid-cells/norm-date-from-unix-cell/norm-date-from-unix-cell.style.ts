import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  normDateCellTypo: {
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',

    whiteSpace: 'pre-wrap',

    [theme.breakpoints.down(1282)]: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
    },
  },
}))

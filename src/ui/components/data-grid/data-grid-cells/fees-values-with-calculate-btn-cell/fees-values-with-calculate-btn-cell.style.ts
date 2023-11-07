import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  feesTableWrapper: {
    width: '100%',
    maxHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  typoCell: {
    fontSize: '14px',
    lineHeight: '19px',
    color: 'rgba(189, 194, 209, 1)',
  },

  typoSpan: {
    color: `${theme.palette.text.second} !important`,
  },

  cellBtn: {
    color: 'rgba(0, 123, 255, 1)',
    paddingTop: '0px',
    paddingBottom: '0px',
    textTransform: 'none',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  warehouseMyTasksBtnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px 0',
    gap: '10px',
  },

  warehouseMyTasksSuccessBtn: {
    height: 30,
    width: 166,

    [theme.breakpoints.down(1282)]: {
      width: 90,
    },
  },

  rowCancelBtn: {
    height: 30,
    padding: '0 25px',
    [theme.breakpoints.down(1282)]: {
      width: 90,
    },
  },

  warehouseMyTasksCancelBtn: {
    width: 114,
    height: 30,

    [theme.breakpoints.down(1282)]: {
      width: 90,
    },
  },
}))

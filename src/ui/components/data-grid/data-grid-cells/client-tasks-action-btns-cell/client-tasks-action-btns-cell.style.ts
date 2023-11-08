import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  infoBtn: {
    height: 30,
  },

  cancelTaskBtn: {
    marginLeft: '20px',
    height: 30,
  },

  clientTasksActionBtnsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}))

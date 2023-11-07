import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  notificationBtnsWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },

  notificationBtn: {
    width: '140px',
    height: '30px',
    padding: '0 12px',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  productMyRequestsBtnsWrapper: {
    display: 'flex',
    width: '100%',
    gap: '30px',
  },

  productMyRequestsBtn: {
    width: '140px',
    height: 30,
  },
}))

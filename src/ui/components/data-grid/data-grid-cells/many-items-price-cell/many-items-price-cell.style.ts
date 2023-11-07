import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  ManyItemsPriceCellMainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px 0',
    gap: 10,
  },
}))

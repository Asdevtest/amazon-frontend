import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  batchBoxesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    padding: '5px',
    maxHeight: '199px',
    overflow: 'auto',
    gap: '5px',
  },

  withScrollBatchBoxesWrapper: {
    justifyContent: 'center',
    gap: 15,
    maxHeight: 'unset',
    overflow: 'unset',
  },
}))

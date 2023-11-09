import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  tags: {
    padding: '10px 0',
  },

  tagItem: {
    maxWidth: 130,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

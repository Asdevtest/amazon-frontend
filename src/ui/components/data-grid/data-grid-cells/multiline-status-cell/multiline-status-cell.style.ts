import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  multilineTextWrapper: {
    width: '100%',
    padding: '5px 0',
    overflow: 'hidden',
  },

  multilineLeftAlignText: {
    textAlign: 'left',
  },

  statusMultilineText: {
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    lineHeight: '19px',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  pricesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
    flexGrow: 1,

    gap: 77,
  },

  multilineText: {
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '14px',
    lineHeight: '19px',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  commentOfSbWrapper: {
    padding: '5px 0',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  multilineTextAlignLeft: {
    width: '100%',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
    fontFamily: 'inherit',
    border: 'none',
    backgroundColor: 'inherit',
    color: theme.palette.text.general,
    resize: 'none',
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
  },

  commentOfSbSubWrapper: {
    maxHeight: '100%',
    width: '100%',
    overflow: 'auto',
  },

  commentOfSbSubMultiText: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    lineHeight: '19px',
  },

  multilineTextAlignWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    wordBreak: 'break-all',
    padding: '10px 0',
    flexWrap: 'nowrap',
  },
}))

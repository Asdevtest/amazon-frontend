import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  multilineTextWrapper: {
    width: '100%',
    padding: '5px 0',
    overflow: 'hidden',
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

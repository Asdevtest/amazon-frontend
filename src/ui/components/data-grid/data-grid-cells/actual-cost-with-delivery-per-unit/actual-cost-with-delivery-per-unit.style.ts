import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  pricesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
    flexGrow: 1,

    gap: 2,
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

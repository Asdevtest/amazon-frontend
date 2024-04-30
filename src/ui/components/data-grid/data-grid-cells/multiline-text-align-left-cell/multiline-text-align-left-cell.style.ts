import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  multilineTextAlignLeftWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexWrap: 'nowrap',
    wordBreak: 'break-all',
    padding: '10px 0',
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
    cursor: 'pointer',
  },

  cursorPointer: {
    cursor: 'pointer',
  },

  fourLinesTextAlignLeft: {
    justifyContent: 'center',
    height: 'auto',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },

  multilineAsinTextAlignLeft: {
    width: '100%',
    maxHeight: '100%',
    textAlign: 'start',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
  },

  multilineTextAlignLeftSub: {
    width: '100px',
  },
}))

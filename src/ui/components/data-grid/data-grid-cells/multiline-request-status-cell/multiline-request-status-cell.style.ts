import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  multilineTextWrapper: {
    width: '100%',
    padding: '5px 0',
    overflow: 'hidden',
  },

  multilineStatusText: {
    textAlign: 'left',
    whiteSpace: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
  },
}))

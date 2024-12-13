import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    padding: '0 5px 0 0',
    maxHeight: '48px',
    overflowY: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  text: {
    minHeight: '16px',
    fontSize: '12px',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    margin: 0,
  },
}))

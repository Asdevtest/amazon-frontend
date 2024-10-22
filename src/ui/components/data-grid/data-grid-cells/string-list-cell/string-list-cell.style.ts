import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    padding: '0 5px 0 0',
    overflowY: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  fixedHeight: {
    height: '48px',
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

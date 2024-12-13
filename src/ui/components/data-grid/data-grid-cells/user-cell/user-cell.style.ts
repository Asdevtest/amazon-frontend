import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  cell: {
    padding: '5px 0',
  },

  text: {
    fontSize: '12px',
    lineHeight: '16px',
  },

  vertical: {
    width: '100%',
    minWidth: '0px',
    display: 'flex',
    flexDirection: 'column',
  },
}))

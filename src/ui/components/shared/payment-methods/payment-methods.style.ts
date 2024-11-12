import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    maxHeight: '59px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  cell: {
    width: '100%',
    padding: '5px 0',
  },
}))

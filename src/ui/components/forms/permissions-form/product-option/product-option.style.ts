import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  flexColumn: {
    minWidth: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  text: {
    fontSize: '12px',
    lineHeight: '18px',
  },
}))

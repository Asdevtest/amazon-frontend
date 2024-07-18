import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },

  text: {
    fontSize: '14px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))

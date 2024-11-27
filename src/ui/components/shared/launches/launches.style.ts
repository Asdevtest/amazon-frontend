import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '5px 10px',
  },

  cell: {
    padding: '5px 0',
  },

  text: {
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    lineHeight: '12px',
    fontWeight: 600,
    borderRadius: '22px',
  },

  expired: {
    textDecoration: 'line-through solid 2px',
  },
}))

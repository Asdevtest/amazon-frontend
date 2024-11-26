import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    margin: '5px 0',
    height: '48px',
    width: '48px',
    borderRadius: '4px',
    overflow: 'hidden',
  },

  mask: {
    padding: '0 14px',
    display: 'flex',
    gap: '20px',
  },
}))

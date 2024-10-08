import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '5px 0',
    height: '58px',
  },

  mask: {
    padding: '0 14px',
    display: 'flex',
    gap: '20px',
  },
}))

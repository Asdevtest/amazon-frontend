import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '5px 0',
    height: '58px',
  },

  image: {
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,
  },

  mask: {
    padding: '0 14px',
    display: 'flex',
    gap: '20px',
  },
}))

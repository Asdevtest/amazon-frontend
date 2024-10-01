import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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

  image: {
    minWidth: '40px',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,
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

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  text: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },

  search: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  tags: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    gap: '5px',
  },

  empty: {
    alignContent: 'center',
    justifyContent: 'center',
  },
}))

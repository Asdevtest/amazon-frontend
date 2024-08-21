import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  mainWrapper: {
    width: '100%',
    height: '82vh',
  },

  seconndText: {
    color: theme.palette.text.second,
  },

  currentAddress: {
    width: 250,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  searchInput: {
    width: 440,
  },
}))

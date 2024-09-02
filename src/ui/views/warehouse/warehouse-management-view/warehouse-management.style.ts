import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
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
}))

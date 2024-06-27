import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  feesTableWrapper: {
    width: '100%',
    maxHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  typoCell: {
    fontSize: '14px',
    lineHeight: '19px',
    color: 'rgba(189, 194, 209, 1)',
  },

  typoSpan: {
    color: `${theme.palette.text.second} !important`,
  },
}))

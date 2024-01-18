import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    marginTop: 10,
    padding: 10,
  },

  table: {
    whiteSpace: 'nowrap',
    '& td': {
      flexShrink: 0,
      color: theme.palette.text.general,
    },
    '& th': {
      color: theme.palette.text.general,
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
    },
  },
  centerTextCell: {
    textAlign: 'center',
  },
  rightTextCell: {
    textAlign: 'right',
  },
  mainTitle: {
    marginTop: '30px',

    color: theme.palette.text.general,
  },

  subTitle: {
    color: theme.palette.text.second,
  },
  replenishRow: {
    '& td': {
      color: theme.palette.text.green,
      textAlign: 'center',
    },

    '& $amountCell': {
      textAlign: 'right',
    },
  },
  withdrawRow: {
    '& td': {
      color: 'red',
      textAlign: 'center',
    },

    '& $amountCell': {
      textAlign: 'right',
    },
  },

  usernameCell: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}))

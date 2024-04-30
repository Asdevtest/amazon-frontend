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
      color: theme.palette.text.primary,
    },
    '& th': {
      color: theme.palette.text.primary,
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

    color: theme.palette.text.primary,
  },

  subTitle: {
    color: theme.palette.text.secondary,
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

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  table: {
    whiteSpace: 'nowrap',

    '& td': {
      flexShrink: 0,
      borderBottom: 'none',
    },
    '& th': {
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
    },
  },
  tableHead: {
    border: '1px solid rgba(217, 222, 229, 1)',
  },
  tableBody: {
    border: '1px solid rgba(217, 222, 229, 1)',

    [theme.breakpoints.down(1282)]: {
      width: '100%',
    },
  },
  footer: {
    paddingLeft: '16px',
    paddingRight: '16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    '& button': {
      marginRight: theme.spacing(2),
    },
    '& button:last-child': {
      marginRight: 0,
    },
  },
  pagination: {
    flexShrink: 0,
  },

  noRowsTitleWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',

    color: theme.palette.text.second,
  },
}))

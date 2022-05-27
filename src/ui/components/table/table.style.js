import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
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
    borderTop: '1px solid rgba(217, 222, 229, 1)',
    borderBottom: '1px solid rgba(217, 222, 229, 1)',
  },
  tableBody: {
    borderBottom: '1px solid rgba(217, 222, 229, 1)',
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
  tableContainer: {
    maxHeight: '100vh',
  },

  noRowsTitleWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
  },
}))

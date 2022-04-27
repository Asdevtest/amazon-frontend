import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    padding: '16px 32px',
  },

  parameterTableCell: {
    borderBottom: 'none',
    padding: '12px 16px',
  },

  parameterTableCellWrapper: {
    display: 'flex',
    width: '360px',
    justifyContent: 'space-between',
  },

  containerTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgba(61, 81, 112, 1)',
    lineHeight: '21px',
  },

  text: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '21px',
  },

  scrollingText: {
    color: '#007BFF',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    maxWidth: '150px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },

  storekeeperWrapper: {
    marginTop: '40px',
  },

  fieldLabel: {
    fontSize: '14px',
  },

  buyerWrapper: {
    marginTop: '40px',
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    padding: '15px 15px',
  },

  parameterTableCell: {
    borderBottom: 'none',
    padding: '12px 16px',
  },

  parameterTableCellWrapper: {
    display: 'flex',
    width: '340px',
    justifyContent: 'space-between',
  },

  containerTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgba(61, 81, 112, 1)',
    lineHeight: '21px',
  },

  text: {
    color: '#001029',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '19px',
    maxWidth: '200px',
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  scrollingText: {
    color: '#007BFF',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    maxWidth: '150px',
    textAlign: 'right',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },

  storekeeperWrapper: {
    marginTop: '40px',
  },

  fieldLabel: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: '#001029',
  },

  buyerWrapper: {
    marginTop: '40px',
  },
}))

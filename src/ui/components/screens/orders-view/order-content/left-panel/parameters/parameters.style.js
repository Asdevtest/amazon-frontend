import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  parameterTableCell: {
    borderBottom: 'none',
    padding: '12px 16px',
  },
  containerTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgba(61, 81, 112, 1)',
    lineHeight: '21px',
    minWidth: '140px',
  },

  text: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },

  scrollingText: {
    color: '#007BFF',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    maxWidth: '300px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
}))

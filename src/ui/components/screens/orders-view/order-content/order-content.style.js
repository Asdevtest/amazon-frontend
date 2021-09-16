import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  orderContainer: {
    padding: '16px 32px',
  },
  containerTitle: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '18px',
    color: 'rgba(77, 189, 116, 1)',
  },
  panelsWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  tableWrapper: {
    padding: '16px',
  },
  tableText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  noBoxesText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '22px',
    marginBottom: '24px',
  },
}))

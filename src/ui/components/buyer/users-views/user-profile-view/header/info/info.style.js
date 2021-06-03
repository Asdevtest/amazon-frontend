import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    justifyContent: 'space-between',
    width: '100%',
  },
  typoLabel: {
    marginRight: '16px',
  },
  typoValue: {
    fontWeight: 600,
  },
  paper: {
    border: '1px solid #C8CED3',
    margin: '24px 16px 0 0',
    padding: '8px 16px',
  },
  divider: {
    margin: '8px -16px',
  },
}))

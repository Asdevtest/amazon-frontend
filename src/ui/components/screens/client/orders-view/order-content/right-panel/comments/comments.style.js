import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  containerTitle: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '18px',
    color: 'rgba(61, 81, 112, 1)',
    marginBottom: '8px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'rgba(143, 152, 165, 1)',
  },
  input: {
    fontSize: '13px',
    height: 'auto',
    width: '100%',
    marginTop: '2px',
  },
  commentsWrapper: {
    display: 'flex',
  },
  commentsSubWrapper: {
    marginRight: '20px',
  },
  commentsLastSubWrapper: {
    flexGrow: 1,
  },
}))

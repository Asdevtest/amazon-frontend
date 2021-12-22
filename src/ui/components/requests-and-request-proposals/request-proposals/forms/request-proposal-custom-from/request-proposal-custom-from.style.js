import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {},
  button: {
    marginLeft: '10px',
  },
  resultField: {
    width: '100%',
    minHeight: '20vh',
    color: 'rgba(61, 81, 112, 1)',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  commentField: {
    width: '100%',
    minHeight: '10vh',
    color: 'rgba(61, 81, 112, 1)',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  title: {
    marginBottom: '20px',
  },
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
  },
}))

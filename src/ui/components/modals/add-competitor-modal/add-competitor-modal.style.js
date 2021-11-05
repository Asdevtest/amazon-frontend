import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },

  linkField: {
    minHeight: '100px',
    minWidth: '400px',
    display: 'block',
    overflow: 'scroll',
  },

  commentField: {
    minHeight: '200px',
    minWidth: '400px',
    display: 'block',
    overflow: 'scroll',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
  },
}))

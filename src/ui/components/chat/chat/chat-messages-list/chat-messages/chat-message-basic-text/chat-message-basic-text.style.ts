import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    backgroundColor: '#FCFCFC',
    padding: '15px 14px',
    borderRadius: '4px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
  },
  rootIsIncomming: {},
}))

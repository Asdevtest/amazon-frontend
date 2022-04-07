import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
  chatWrapper: {
    width: '100%',
    borderBottomWidth: '1px',
    borderBottomColor: '#E0E0E0',
    borderBottomStyle: 'solid',
  },
  chatWrapperIsSelected: {
    borderBottomColor: '#006CFF',
  },
}))

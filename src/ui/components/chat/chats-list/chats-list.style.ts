import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'auto',

    border: '1px solid #E0E0E0',
  },
  chatWrapper: {
    width: '100%',
    borderBottomWidth: '2px',
    borderBottomColor: '#E0E0E0',
    borderBottomStyle: 'solid',
  },
  chatWrapperIsSelected: {
    borderBottomColor: '#006CFF',
  },

  '@media (max-width: 768px)': {
    root: {
      borderRadius: '4px',
    },
  },
}))

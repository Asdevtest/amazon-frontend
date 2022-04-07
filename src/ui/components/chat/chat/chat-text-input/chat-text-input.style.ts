import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: '#EBEBEB',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    '& .react-mde': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      '& div:last-child': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .mde-textarea-wrapper': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          '& textarea': {
            resize: 'none',
          },
        },
      },
    },
  },
}))

import {createStyles} from '@material-ui/styles'

export const styles = () =>
  createStyles({
    root: {
      height: '32px',
      border: '1px solid rgba(217, 222, 229, 1)',
      borderRadius: '4px',
      width: '200px',
      flexShrink: '0',
      '&$disabled': {
        backgroundColor: '#e4e7ea',
      },
    },
    input: {
      paddingLeft: '8px',
      paddingRight: '8px',
      color: 'rgba(61, 81, 112, 1)',
    },
    focused: {
      border: '1px solid rgba(0, 123, 255, 1)',
    },
    disabled: {},
  })

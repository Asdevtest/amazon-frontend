import {createStyles} from '@material-ui/styles'

export const styles = () =>
  createStyles({
    root: {
      height: '50px',
      paddingLeft: '50px',
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '15px',
      letterSpacing: '0em',
      color: 'rgba(189, 194, 209, 1)',
      '&$selected': {
        backgroundColor: 'transparent',
        color: 'rgba(0, 123, 255, 1)',
      },
      '&$selected:hover': {},
      '&:hover': {},
    },
    selected: {},
  })

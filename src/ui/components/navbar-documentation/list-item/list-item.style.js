// import {createStyles} from '@material-ui/styles'

export const styles = () => ({
  root: {
    height: '50px',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '15px',
    color: 'rgba(61, 81, 112, 1)',
    borderLeft: `5px solid transparent`,

    '&$selected': {
      borderLeft: `5px solid rgba(0, 123, 255, 1)`,
      backgroundColor: 'transparent',
    },
    '&$selected:hover': {
      borderLeft: `5px solid rgba(0, 123, 255, 1)`,
    },
    '&:hover': {},
  },
  selected: {},
})

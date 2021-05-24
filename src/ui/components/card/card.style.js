import {Paper, withStyles} from '@material-ui/core/'

export const StyledPaper = withStyles({
  root: {
    boxShadow: `0px 3px 12px 0px rgba(0, 0, 0, 0.15)`,
  },
})(Paper)

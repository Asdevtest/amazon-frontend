import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    listItemRoot: {
      height: '50px',
      fontSize: '13px',
      lineHeight: '15px',
      fontWeight: 500,
      color: theme.palette.text.primary,
      borderLeft: `5px solid transparent`,
      paddingRight: '16px',

      '&$listItemSelected': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: 'transparent',
      },
      '&$listItemSelected:hover': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
      },
      '&:hover': {},
    },
    listItemSelected: {
      color: theme.palette.primary.main,
    },
    iconWrapper: {
      minWidth: '0',
      margin: '16px 16px 16px 11px',
      color: 'rgba(189, 194, 209, 1)',
    },
  })

import {makeStyles} from '@material-ui/core'

export const useStyles = drawerWidth =>
  makeStyles(theme => ({
    root: {
      padding: `${theme.spacing(11)}px ${theme.spacing(4)}px`,
      flexGrow: 1,
      backgroundColor: 'rgba(245, 246, 248, 1)',
      marginLeft: `${drawerWidth}px`,
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px',
        padding: '24px',
      },
    },
  }))

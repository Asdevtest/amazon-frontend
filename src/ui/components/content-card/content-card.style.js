import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  paper: {
    height: '94px',
    width: '282px',
    boxShadow: `0px 5px 19px 0px rgba(90, 97, 105, 0.12)`,
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '348px',
    },
  },
  paperTitle: {
    flex: '1',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: 'rgba(61, 81, 112, 1)',
  },
  paperSubTitle: {
    flex: '1',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'rgba(189, 194, 209, 1)',
  },
  paperTimer: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#FF0000',
    marginRight: '8px',
    marginLeft: '17px',
  },
  circle: {
    border: `3px solid rgba(84, 173, 255, 1)`,
    borderRadius: '50%',
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    marginRight: '16px',
  },
  circleTitle: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '47px',
    color: 'rgba(61, 81, 112, 1)',
  },
  boxContainer: {
    position: 'relative',
    minWidth: '100px',
  },
  boxWrapper: {
    position: 'absolute',
    minWidth: '100px',
    display: 'flex',
  },
}))

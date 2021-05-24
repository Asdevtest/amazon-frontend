import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles({
  root: {
    height: '136px',
    minWidth: '320px',
    boxShadow: `0px 5px 19px 0px rgba(90, 97, 105, 0.12)`,
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    flex: '1',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: 'rgba(61, 81, 112, 1)',
  },
  titleWrapper: {
    position: 'relative',
    minWidth: '100px',
  },
  subTitle: {
    flex: '1',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '14px',
    color: 'rgba(189, 194, 209, 1)',
  },
  subTitleWrapper: {
    position: 'absolute',
    display: 'flex',
    right: '16px',
    bottom: '16px',
    textAlign: 'right',
  },
  circle: {
    border: `3px solid rgba(84, 173, 255, 1)`,
    borderRadius: '152px',
    width: '88px',
    height: '88px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    marginRight: '16px',
  },
  circleTitle: {
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '47px',
    color: 'rgba(61, 81, 112, 1)',
  },
})

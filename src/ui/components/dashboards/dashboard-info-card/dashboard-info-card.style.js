import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    height: '120px',
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
    color: theme.palette.text.general,
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
    backgroundColor: 'inherit',
    padding: '10px 10px 0 0',
    '&:hover': {
      backgroundColor: 'inherit',
      color: theme.palette.primary.main,
    },
  },
  subTitleWrapper: {
    position: 'absolute',
    display: 'flex',
    right: '16px',
    bottom: '16px',
    textAlign: 'right',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  circle: {
    border: `3px solid rgba(84, 173, 255, 1)`,
    borderRadius: '152px',
    width: '200px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    marginRight: '16px',
  },
  circleTitle: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '21px',
    color: theme.palette.text.general,
  },
}))

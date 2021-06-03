import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  paper: {
    minWidth: '190px',
    padding: '16px',
    backgroundColor: '#ffefef',
  },
  thumbContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  select: {
    backgroundColor: '#d4ecd4',
  },
  countTypo: {
    fontWeight: 700,
    color: '#ff2d54',
  },
  selectedCount: {
    color: '#119611',
  },
  thumbUpAltOutlinedIcon: {
    color: '#ff2d54',
    transform: 'rotateX(180deg)',
  },
  selectedThumbUpAlt: {
    color: '#119611',
    transform: 'none',
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  paper: {
    width: '245px',
    height: '40px',
    padding: '10px 16px',

    backgroundColor: '#ffefef',
  },
  thumbContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selected: {
    backgroundColor: '#D9FAE5',
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

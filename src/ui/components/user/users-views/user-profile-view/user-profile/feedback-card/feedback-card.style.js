import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
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
    backgroundColor: theme.palette.background.green,
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

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    flexWrap: 'nowrap',
  },
  tooltipsWrapper: {
    display: 'flex',
    alignItems: 'end',
    marginLeft: 3,
    zIndex: '10',
  },

  tooltip: {
    width: '17px',
    height: '17px',
    color: 'red',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipInfo: {
    marginLeft: '3px',
  },
}))

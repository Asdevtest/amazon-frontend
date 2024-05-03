import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  selectRowCellWrapper: {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '5px',
    paddingLeft: 5,
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 15,
  },

  formedCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 5,
  },

  ideaRowGreen: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldGreen,

      width: 48,
      height: 21,
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },

  ideaRowYellow: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldYellow,

      width: 48,
      height: 21,
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },
}))

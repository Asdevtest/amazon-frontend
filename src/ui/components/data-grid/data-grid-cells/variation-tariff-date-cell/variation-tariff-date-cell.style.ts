import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px',
  },

  dateParam: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '15px',

    svg: {
      width: '25px',
      height: '20px',

      color: theme.palette.primary.main,

      '> g': {
        '> path': {
          fill: theme.palette.background.gray,
        },
      },
    },
  },

  iconWrapper: {
    position: 'relative',
  },

  tooltip: {
    position: 'absolute',
    top: '0',
    right: '0',
    transform: 'translate(90%, -30%)',

    svg: {
      width: '13px',
      height: '13px',
    },
  },
}))

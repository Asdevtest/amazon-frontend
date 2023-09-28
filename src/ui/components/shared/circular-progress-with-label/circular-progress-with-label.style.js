import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    border: '7px solid rgb(255, 255, 255, .2)',
    borderRadius: '20px',
    padding: '10px',
    background: 'rgb(126, 125, 138, 0.9)',
  },

  subWrapper: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrapper: {
    position: 'relative',
    display: 'inline-flex',
  },
  text: {
    fontSize: '26px',
    color: theme.palette.text.second,
  },

  standartText: {
    fontSize: '26px',
    color: theme.palette.text.second,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 320,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
  },

  information: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  diagramClassName: {
    color: theme.palette.primary.main,
  },
}))

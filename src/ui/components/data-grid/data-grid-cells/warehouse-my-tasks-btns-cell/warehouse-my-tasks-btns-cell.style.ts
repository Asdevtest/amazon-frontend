import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  warehouseMyTasksBtnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0',
    gap: '10px',
  },

  button: {
    height: 30,
    width: 140,

    [theme.breakpoints.down(1282)]: {
      width: 90,
    },
  },
}))

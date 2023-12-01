import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  destinationAndTariffWrapper: {
    padding: '20px 0',
  },

  storekeeperBtn: {
    height: 'auto',
    width: 160,
    marginTop: 10,
    whiteSpace: 'normal',
    color: '#fff',
    background: theme.palette.primary.main,
  },
}))

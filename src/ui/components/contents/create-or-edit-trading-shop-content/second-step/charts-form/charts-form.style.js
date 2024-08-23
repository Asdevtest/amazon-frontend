import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  cardHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  cardWrapper: {
    width: 1200,
    height: '420px',
  },
  indicator: {
    color: '#CCE2FF',
  },

  barStatusWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
}))

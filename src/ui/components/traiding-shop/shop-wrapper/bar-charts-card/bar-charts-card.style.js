import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  cardHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  cardWrapper: {
    width: '100%',
    height: '493px',
    padding: '40px 30px',
  },
  indicator: {
    color: '#CCE2FF',
  },

  barStatusesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },

  barStatusWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '40px',
  },
}))

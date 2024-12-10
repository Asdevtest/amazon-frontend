import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  cardOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  cardName: {
    fontSize: 14,
  },
}))

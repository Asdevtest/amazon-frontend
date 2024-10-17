import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  form: {
    height: '100%',
    width: '610px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',

    div: {
      margin: 0,
    },
  },

  title: {
    marginBottom: 20,
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },
}))

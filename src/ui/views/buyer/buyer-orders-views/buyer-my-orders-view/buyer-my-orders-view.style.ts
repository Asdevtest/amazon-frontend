import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  attentionRow: {
    boxShadow: 'inset 0 0 30px rgba(247, 179, 7, .3)',
  },
}))

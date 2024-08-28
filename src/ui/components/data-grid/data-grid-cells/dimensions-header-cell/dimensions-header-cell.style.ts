import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    marginRight: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
  },

  title: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  title: {
    fontSize: '18px',
    lineHeight: '140%',
    marginBottom: 20,
  },

  btnsWrapper: {
    display: 'flex',
    gap: 20,
    flexDirection: 'column',
  },
}))

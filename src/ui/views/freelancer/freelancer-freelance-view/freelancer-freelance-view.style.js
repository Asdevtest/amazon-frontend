import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  title: {
    fontSize: '18px',
    lineHeight: '140%',
    marginBottom: 20,
  },

  btnsWrapper: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
}))

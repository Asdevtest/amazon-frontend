import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  radio: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '14px',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  text: {
    fontSize: '14px',
    lineHeight: '19px',
  },

  vertical: {
    width: '100%',
    minWidth: '0px',
    display: 'flex',
    flexDirection: 'column',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  back: {
    width: 25,
    height: 25,
  },

  title: {
    minHeight: 25,
    width: '90%',
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  appVersion: {
    minWidth: 'fit-content',
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textAlign: 'right',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))

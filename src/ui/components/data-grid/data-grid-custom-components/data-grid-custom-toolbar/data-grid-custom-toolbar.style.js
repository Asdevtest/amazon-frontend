import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapperToolbar: {
    width: '100%',
    padding: '5px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  toolbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },

  flexEnd: {
    width: '100%',
    justifyContent: 'flex-end',
  },

  text: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
  },
}))

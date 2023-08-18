import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  buttonsWrapper: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  button: {
    padding: '0 20px',
  },

  archiveButton: {
    color: `${theme.palette.primary.main} !important`,
  },

  datagridWrapper: {
    height: 'calc(100vh - 52px)',
  },
}))

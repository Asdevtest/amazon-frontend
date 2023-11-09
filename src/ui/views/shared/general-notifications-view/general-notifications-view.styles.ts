import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

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
    height: 'calc(100vh - 190px)',
    width: '100%',
  },

  actionPanelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInputClient: {
    width: '420px',
  },

  searchInputFreelancer: {
    width: '350px',
  },

  searchInput: {
    width: '300px',
  },
}))

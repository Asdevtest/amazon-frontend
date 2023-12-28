import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  linkToNewTab: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f2f4f7',
    borderRadius: '50%',
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.17)',
  },

  icon: {
    width: '20px !important',
    height: '20px !important',
  },

  button: {
    padding: '8px 24px',
    color: '#912018',
    fontWeight: 500,
    background: '#fee4e2',
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.17)',
    borderRadius: 24,
  },
}))

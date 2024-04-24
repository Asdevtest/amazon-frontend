import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  parametersButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },

  parametersButtonTitle: {
    fontSize: '16px',
    fontWeight: 600,
  },

  parametersButtonIcon: {
    color: theme.palette.primary.main,
  },

  menu: {
    borderRadius: '12px',
    display: 'flex',
    width: '420px',
    height: '630px',
    padding: '12px',

    boxShadow: `0px 2px 11px 2px ${theme.palette.boxShadow.general}`,
    overflow: 'hidden',
  },

  list: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
  },

  searchInput: {
    width: '100%',
    height: '40px',
  },

  parametersWrapper: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',

    overflow: 'auto',

    padding: '10px 14px',

    border: '1px solid var(--Gray-100, #F2F4F7)',
    boxShadow: '0px 2.18px 4.36px 0px rgba(97, 97, 97, 0.18), 0px 1.09px 2.18px 0px rgba(97, 97, 97, 0.18)',
  },
}))

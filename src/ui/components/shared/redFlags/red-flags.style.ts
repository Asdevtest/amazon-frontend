import { makeStyles } from 'tss-react/mui'

export const useRedFlagStyles = makeStyles()(theme => ({
  saveBtn: {
    padding: '0',
    border: 'none',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    cursor: 'pointer',
    color: theme.palette.text.general,
  },
  flagIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,

    '& > img': {
      width: '100%',
      height: '100%',
    },
  },

  themeIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '0.3s ease',
  },
}))

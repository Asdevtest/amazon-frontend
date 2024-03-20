import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  iconWrapper: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  icon: {
    width: '24px !important',
    height: '24px !important',
    padding: 2,
    background: 'rgba(0, 123, 255, 0.28)',
    boxShadow: '0 0 5px 5px rgba(0, 123, 255, 0.2)',
    borderRadius: '50%',

    path: {
      stroke: theme.palette.primary.main,
    },
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 500,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  icon: {
    width: '24px !important',
    height: '24px !important',
    padding: 2,
    color: 'rgba(0, 123, 255, 0.28)',
    background: 'rgba(0, 123, 255, 0.28)',
    boxShadow: '0 0 5px 5px rgba(0, 123, 255, 0.2)',
    borderRadius: '50%',

    path: {
      stroke: theme.palette.primary.main,
    },
  },

  title: {
    fontSize: 18,
    lineHeight: '24px',
  },

  text: {
    fontSize: 15,
    lineHeight: '24px',
  },

  bold: {
    fontWeight: 700,
  },

  textSecond: {
    color: theme.palette.text.second,
  },
}))

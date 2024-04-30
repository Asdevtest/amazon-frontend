import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  text: {
    color: theme.palette.text.secondary,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  title: {},

  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    justifyContent: 'space-between',
    width: '100%',
  },
  typoLabel: {
    marginRight: '16px',
  },
  typoValue: {
    fontWeight: 600,
  },
  paper: {
    width: '470px',
    border: '1px solid #C8CED3',
    padding: '8px 16px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      border: 'none',
      padding: 0,
      '& > :nth-of-type(n)': {
        marginBottom: 10,
      },
    },
  },
  divider: {
    margin: '8px -16px',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  mobileDivider: {
    [theme.breakpoints.down(768)]: {
      display: 'block',
    },
  },
}))

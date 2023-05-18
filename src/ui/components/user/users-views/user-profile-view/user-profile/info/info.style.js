import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  title: {
    color: theme.palette.text.general,
  },

  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    justifyContent: 'space-between',
    width: '100%',
  },
  typoLabel: {
    marginRight: '16px',
    color: theme.palette.text.general,
  },
  typoValue: {
    fontWeight: 600,
    color: theme.palette.text.general,
  },
  paper: {
    width: '470px',
    border: '1px solid #C8CED3',
    margin: '24px 16px 0 0',
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

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    '& :last-child': {
      borderBottom: 'none',
    },
  },

  destination: {
    minHeight: 48,
    flex: 1,
    display: 'flex',
    alignItems: 'center',

    margin: '0 -10px',
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
  },

  borderRight: {
    borderRight: `1px solid ${theme.palette.input.customBorder}`,
  },

  borderLeft: {
    borderLeft: `1px solid ${theme.palette.input.customBorder}`,
  },
}))

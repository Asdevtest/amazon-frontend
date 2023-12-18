import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',

    '& :last-child': {
      borderBottom: 'none',
    },
  },

  destination: {
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',

    margin: '0 -10px',
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
    borderRight: `1px solid ${theme.palette.input.customBorder}`,
    borderLeft: `1px solid ${theme.palette.input.customBorder}`,
  },
}))

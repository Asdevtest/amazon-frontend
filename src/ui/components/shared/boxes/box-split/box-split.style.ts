import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    color: theme.palette.primary.main,
  },

  maxBox: {
    width: 32,
    height: 32,
  },

  miniBox: {
    width: 26,
    height: 26,
  },

  border: {
    padding: 2,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
  },
}))

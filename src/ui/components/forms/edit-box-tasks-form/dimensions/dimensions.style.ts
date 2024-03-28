import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  dimensions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
  },

  dimensionContainer: {
    width: 130,
    height: 40,
  },

  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: 5,
  },
}))

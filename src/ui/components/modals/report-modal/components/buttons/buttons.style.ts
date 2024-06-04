import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexRowContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
  },

  flexEnd: {
    justifyContent: 'flex-end',
  },

  tableContainer: {
    width: '100%',
    height: 410,
  },

  checkbox: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.secondary,
  },
}))

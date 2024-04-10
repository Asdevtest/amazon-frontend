import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 920,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  text: {
    color: theme.palette.text.second,
  },

  tableWrapper: {
    height: 230,
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  categoryTitle: {
    width: 'max-content',
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  categoryText: {
    color: theme.palette.text.general,
  },

  categoresWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
}))

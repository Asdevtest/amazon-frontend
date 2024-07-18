import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 30,
  },

  commentField: {
    fontSize: 14,
    lineHeight: '19px',
    height: '100%',
  },

  label: {
    marginBottom: 5,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  commentFieldContainer: {
    margin: 0,
  },
}))

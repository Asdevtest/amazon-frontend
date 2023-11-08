import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  currentBoxTitle: {
    display: 'flex',
    gap: '23px',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: '10px',
  },

  sectionTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    lineHeight: '140%',
  },

  marginBox: {
    '&:not(:last-child)': {
      marginBottom: '20px',
    },
  },
}))

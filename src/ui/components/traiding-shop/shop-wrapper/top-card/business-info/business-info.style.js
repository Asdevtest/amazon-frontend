import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  businessInfoWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  businessInfoTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  businessInfoDate: {
    color: theme.palette.text.general,
  },

  businessInfoDateAgo: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },
}))

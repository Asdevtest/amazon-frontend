import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  labelWrapperColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  labelText: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },

  mediumLabelText: {
    fontSize: '18px',
  },

  labelTextBold: {
    fontWeight: 'bold',
  },

  grayLabelText: {
    color: theme.palette.text.second,
  },
}))

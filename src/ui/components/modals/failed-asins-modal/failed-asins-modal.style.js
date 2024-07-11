import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '445px',
    minHeight: '168px',
  },
  title: {
    textAlign: 'center',
    width: '350px',

    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  asinsWrapper: {
    display: 'flex',
    gap: '25px',
    color: 'red',
  },
}))

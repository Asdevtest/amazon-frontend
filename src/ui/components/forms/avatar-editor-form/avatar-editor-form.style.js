import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
  },

  img: {
    width: 200,
    height: 200,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },

  successText: {
    color: '#00B746',
  },

  spanText: {
    color: theme.palette.primary.main,
    fontWeight: '500',
  },

  textsWrapper: {
    alignSelf: 'center',
  },
}))

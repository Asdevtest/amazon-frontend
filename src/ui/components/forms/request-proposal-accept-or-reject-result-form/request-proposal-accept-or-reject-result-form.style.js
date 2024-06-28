import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '586px',
    padding: 10,
  },

  btnsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'end',
    gap: '20px',
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '30px',
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',

    padding: 0,
  },

  ratingWrapper: {
    width: '100%',
  },

  rating: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '40px',

    marginRight: '25px',
  },
}))

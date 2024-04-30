import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '586px',
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

    marginBottom: '30px',
  },

  btnSubmit: {
    width: '144px',
    height: '40px',
    fontSize: '14px',
    lineHeight: '19px',
  },

  btnLargeSubmit: {
    width: '197px',
  },

  cancelSubmit: {},

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

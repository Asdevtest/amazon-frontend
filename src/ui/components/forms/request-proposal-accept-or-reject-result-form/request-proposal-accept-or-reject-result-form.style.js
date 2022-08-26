import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
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
    color: '#001029',
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

  cancelSubmit: {
    color: '#001029',
  },

  inputsWrapper: {
    height: '141px',
    width: '100%',

    // overflow: 'auto',
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

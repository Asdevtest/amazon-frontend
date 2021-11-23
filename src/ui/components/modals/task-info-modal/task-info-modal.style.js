import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  heightFieldAuto: {
    height: 'auto',
    minWidth: '650px',
  },
  commentsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  form: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },
  modalTitle: {
    marginBottom: '20px',
  },
  subTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },

  imgBox: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  photoWrapper: {
    width: '200px',
  },
}))

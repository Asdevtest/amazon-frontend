import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
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
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  productTitle: {
    whiteSpace: 'nowrap',
    width: '250px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  shippinLabel: {
    height: '56px',
    whiteSpace: 'nowrap',
    width: '250px',
    overflowX: 'auto',
  },

  imgBlock: {
    display: 'flex',
  },

  imgSubBlock: {
    display: 'flex',
    marginLeft: '10px',
    flexDirection: 'column',
  },

  countBlock: {
    display: 'flex',
  },

  buttonsWrapper: {
    marginTop: '20px',
  },

  superboxTypo: {
    marginLeft: '10px',
    color: '#007BFF',
    fontSize: '20px',
    fontWeight: '900px',
  },

  amount: {
    marginLeft: '5px',
  },
}))

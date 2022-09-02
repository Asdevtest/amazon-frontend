import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  commentsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  form: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
  },
  modalTitle: {
    marginRight: '100px',
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
    display: 'flex',
    justifyContent: 'end',
  },

  actionButton: {
    width: '126px',
    height: '40px',
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

  row: {
    outline: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    cursor: 'url(/assets/icons/Cursor.svg), auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(0.99)',
      backgroundColor: 'rgba(123, 163, 255, 0.3)',
    },
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },

  needPay: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: '15px',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '20px',
  },

  storekeeperField: {
    maxWidth: '250px',
    margin: '0',
  },
  userLinkWrapper: {
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'flex-end',
  },

  imageFileInputWrapper: {
    width: '100%',
    display: 'flex',
    marginTop: '20px',
    alignItems: 'flex-start',
  },

  // filesWrapper: {
  //   width: '450px',
  //   maxHeight: '220px',
  //   overflow: 'auto',
  // },

  filesContainer: {
    width: 'auto',
    marginLeft: '30px',
  },

  linkText: {
    color: '#007BFF',
    cursor: 'pointer',
    transition: '.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'auto',

    '&:hover': {
      opacity: '0.8',
    },
  },

  filesWrapper: {
    marginTop: 20,
    height: 125,
  },

  files: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },

  textEllipsis: {
    maxWidth: 150,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

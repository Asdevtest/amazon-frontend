import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  commentsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  form: {
    // marginTop: theme.spacing(2.5),
    // marginBottom: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
  },
  modalTitle: {
    marginBottom: '25px',
    fontSize: '22px',
    lineHeight: '30px',
    fontWeight: '600',
    color: theme.palette.text.general,
  },
  subTitle: {
    color: theme.palette.text.general,
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
    alignItems: 'center',
  },

  buttonsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  superboxTypo: {
    marginLeft: '10px',
    color: theme.palette.primary.main,
    fontSize: '20px',
    fontWeight: '900px',
  },

  amount: {
    marginLeft: '5px',
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },

  closeButton: {
    width: '136px',
    height: '40px',
    color: theme.palette.text.general,
  },
  saveButton: {
    width: '136px',
    height: '40px',
  },

  '@media (max-width: 768px)': {
    form: {
      // marginTop: theme.spacing(2.5),
      // marginBottom: theme.spacing(2.5),
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    buttonsWrapper: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
  },
}))

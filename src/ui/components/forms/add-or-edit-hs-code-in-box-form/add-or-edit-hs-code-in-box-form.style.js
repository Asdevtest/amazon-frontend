import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  },
  modalTitle: {
    marginBottom: '25px',
    fontSize: '22px',
    lineHeight: '30px',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  imgBox: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  productTitle: {
    whiteSpace: 'nowrap',
    width: '250px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
    [theme.breakpoints.down(768)]: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
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

  closeButton: {
    width: '136px',
    height: '40px',
    color: theme.palette.text.general,
  },
  saveButton: {
    width: '136px',
    height: '40px',
  },
}))

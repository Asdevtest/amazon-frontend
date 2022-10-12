import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    padding: '40px',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  mainBlockWrapper: {
    minWidth: '45%',
  },
  middleBlockWrapper: {
    width: '26.3%',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .1)',
    padding: '10px',
  },
  middleBlockItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleBlockWrapper: {
    display: 'flex',
    marginBottom: '20px',
  },
  titleWrapper: {
    marginLeft: '35px',
  },
  userPhoto: {
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  requestInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  requestItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: '15px',
  },
  blockInfoWrapper: {
    width: '47%',
    height: '120px',
    border: '1px solid rgba(0,0,0, .1)',
    borderRadius: '4px',
  },
  title: {
    width: '539px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: theme.palette.text.second,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    height: '60px',
  },
  subTitle: {
    marginTop: '10px',
    color: theme.palette.text.second,
  },
  btnsBlockWrapper: {
    width: '23%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  stopBtn: {
    width: '100%',
    background: '#F3AF00',
    color: '#001029',
    '&:hover': {
      opacity: '0.8',
      background: '#F3AF00',
    },
  },
  btnsWrapper: {},
  btnsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnsRowIsLast: {
    marginBottom: 0,
  },
  buttonWrapperFullWidth: {
    flex: 1,
    display: 'flex',
  },
  button: {
    display: 'flex',
    flex: 1,
  },
  buttonEditRemoveBtnIsShown: {
    marginLeft: '10px',
  },
  requestStatus: {
    marginLeft: '15px',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#00B746',
  },
  successBtn: {
    backgroundColor: '#00B746',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#00B746',
    },
  },
  cancelBtn: {
    color: '#fff',
    // marginLeft: '10px',
    backgroundColor: '#F44336',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },
  price: {
    color: theme.palette.primary.main,
  },

  standartText: {
    color: theme.palette.text.general,
  },
}))

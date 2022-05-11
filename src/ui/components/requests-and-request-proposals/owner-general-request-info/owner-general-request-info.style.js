import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    display: 'flex',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .3)',
    padding: '20px',
  },
  mainBlockWrapper: {
    minWidth: '660px',
  },
  middleBlockWrapper: {
    marginLeft: '100px',
    width: '350px',
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
    padding: '15px',
  },
  blockInfoWrapper: {
    minWidth: '322px',
    height: '120px',
    border: '1px solid rgba(0,0,0, .1)',
    borderRadius: '4px',
  },
  title: {
    width: '539px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#354256',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    height: '60px',
  },
  subTitle: {
    marginTop: '10px',
  },
  btnsBlockWrapper: {
    marginLeft: '40px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  stopBtn: {
    width: '100%',
    background: '#F3AF00',
    color: '#354256',
    '&:hover': {
      opacity: '0.8',
      background: '#F3AF00',
    },
  },
  btnsWrapper: {},
  btnsRow: {
    display: 'flex',
    flexDirection: 'row',
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
    marginLeft: '10px',
    backgroundColor: '#F44336',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },
  price: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#0460DE',
  },
}))

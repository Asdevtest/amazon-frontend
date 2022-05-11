import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .3)',
    padding: '20px',
  },
  mainBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  middleBlockWrapper: {
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
    minWwidth: '660px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subTitle: {
    marginTop: '10px',
  },
  btnsBlockWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  actionBtn: {
    width: '242px',
    height: '42px',
  },
  btnsWrapper: {
    display: 'flex',
    marginBottom: '30px',
    justifyContent: 'space-between',
  },
  requestStatus: {
    marginLeft: '15px',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#00B746',
  },
}))

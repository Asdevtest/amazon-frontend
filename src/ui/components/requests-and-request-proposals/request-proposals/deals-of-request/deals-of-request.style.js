import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    marginBottom: '30px',
  },

  mainWrapper: {
    display: 'flex',

    flexDirection: 'column',

    width: '100%',
  },

  accordion: {
    width: '100%',
    backgroundColor: 'red',
  },

  title: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#354256',
  },

  dealWrapper: {
    display: 'flex',
    border: '1px solid rgba(0,0,0, .1)',
    width: '100%',
    padding: '15px 30px',

    justifyContent: 'space-between',
  },

  userInfoWrapper: {
    display: 'flex',

    width: '300px',
  },

  cardImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  userNameWrapper: {
    marginLeft: '10px',
  },

  userRating: {
    marginLeft: '5px',
  },

  userRatingWrapper: {
    marginLeft: '20px',
    display: 'flex',
  },

  blockInfoWrapper: {
    marginLeft: '10px',
    minWidth: '235px',

    border: '1px solid rgba(0,0,0, .1)',
    borderRadius: '4px',
  },

  requestItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
  },

  requestStatusWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  requestStatus: {
    display: 'flex',
    alignItems: 'center',
    // width: '300px',
    textAlign: 'center',

    marginLeft: '15px',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#00B746',

    '& > span': {
      display: 'block',
      width: '13px',
      height: '13px',
      borderRadius: '50%',
      marginRight: '10px',
    },
  },

  price: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#0460DE',
  },
}))

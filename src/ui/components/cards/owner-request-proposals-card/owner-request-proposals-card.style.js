import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  cardMainWrapper: {
    height: '280px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .3)',

    padding: '25px 40px 40px 25px',
  },

  cardFooter: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  userInfoMainWrapper: {
    width: '741px',
  },

  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  cardImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  userInfoWrapper: {
    display: 'flex',
  },
  userWrapper: {
    display: 'flex',
  },

  actionButton: {
    marginLeft: '50px',
    minWidth: '240px',
  },

  cancelBtn: {
    backgroundColor: '#FF1616',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#FF1616',
    },
  },

  successBtn: {
    backgroundColor: '#00B746',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#00B746',
    },
  },

  timeInfoWrapper: {
    width: '300px',
  },

  timeItemInfoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  cardPrice: {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#354256',
  },

  successDeals: {
    marginLeft: '50px',
  },

  userRating: {
    marginLeft: '50px',
  },

  userNameWrapper: {
    marginLeft: '10px',
  },
}))

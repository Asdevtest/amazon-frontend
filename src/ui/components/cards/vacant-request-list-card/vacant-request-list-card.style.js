import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    height: '230px',

    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',

    display: 'flex',
    justifyContent: 'space-between',
    padding: '30px',
  },

  nameWrapper: {
    display: 'flex',

    flexDirection: 'column',

    marginLeft: '15px',
  },

  cardTitleBlockWrapper: {
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#354256',
    marginBottom: '20px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  cardSubTitle: {
    marginBottom: '5px',
  },

  rightBlockWrapper: {
    marginLeft: '40px',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  divider: {
    width: '100%',
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: '30px',
  },

  userRating: {
    marginLeft: '100px',
  },

  middleBlockWrapper: {
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .1)',
    width: '30%',
    padding: '20px 25px',

    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  timeItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  cardImg: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  actionButton: {
    width: '242px',
    height: '52px',
  },

  cardPrice: {
    fontSize: '18px',
    lineHeight: '21px',
    color: '#006CFF',
  },

  statusText: {
    fontSize: '18px',
    lineHeight: '21px',
    color: '#00B746',
  },

  updatedAtWrapper: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
  },

  updatedAtText: {
    marginRight: '20px',
    fontSize: '10px',
    fontWeight: 'bold',
  },
}))

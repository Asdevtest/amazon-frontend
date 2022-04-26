import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',

    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .1)',

    display: 'flex',

    padding: '0 40px 0 20px',
  },

  nameWrapper: {
    display: 'flex',

    flexDirection: 'column',

    marginLeft: '15px',
  },

  cardTitleBlockWrapper: {
    width: '650px',
    padding: '20px 0 25px',
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#354256',
    maxWidth: '420px',
    marginBottom: '20px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  cardSubTitle: {
    marginBottom: '5px',
    maxWidth: '420px',
    overflow: 'auto',
    maxHeight: '90px',
  },

  proposalComment: {
    marginBottom: '20px',
    maxWidth: '720px',
    overflow: 'auto',
    maxHeight: '90px',
  },

  rightBlockWrapper: {
    padding: '20px 0 25px',
    marginLeft: '40px',
    display: 'flex',
    flexDirection: 'column',
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

  rightSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  rightItemSubWrapper: {
    minWidth: '280px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  timeWrapper: {
    display: 'flex',
  },

  timeCount: {
    marginLeft: '10px',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: '600px',
    marginTop: 'auto',
  },

  price: {
    color: '#006CFF',
  },
}))

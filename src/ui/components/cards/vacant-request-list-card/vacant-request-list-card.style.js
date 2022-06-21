import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    height: '263px',

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

  cardTitleBlockHeaderWrapper: {
    display: 'flex',
    alignItems: 'start',
    // justifyContent: 'space-between',
  },

  cardTitleBlockWrapper: {
    width: '661px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  cardTitle: {
    margin: '0 10px 0 20px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#001029',
    overflowY: 'auto',
    width: 'minmax(220px, max-content)',
    height: '160px',
  },

  cardSubTitle: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#656565',
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
    width: '819px',

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
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#656565',
    marginRight: 5,
  },

  cardTitleBlockFooterWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  subBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSubBlockWrapper: {
    width: '403px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },

  rightSubBlockWrapper: {
    width: '377px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
}))

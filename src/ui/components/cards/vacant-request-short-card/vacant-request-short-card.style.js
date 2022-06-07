import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  cardWrapper: {
    minHeight: '373px',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
  },

  cardTitleBlockWrapper: {
    padding: '30px 20px 30px 20px',
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#354256',
    marginBottom: '10px',
    height: '50px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  cardSubTitle: {
    marginBottom: '5px',
  },

  cardActionBlockWrapper: {
    padding: '0px 20px 30px 20px',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  divider: {
    width: '100%',
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },

  timeInfoWrapper: {
    width: '100%',
    margin: '22px 0 10px',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardImg: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    objectPosition: 'center',
    marginRight: '5px',
  },

  actionButton: {
    width: '242px',
    height: '52px',
    marginTop: '30px',
  },

  cardPrice: {
    fontSize: '14px',
    lineHeight: '16px',
    color: '#006CFF',
  },

  cardTime: {
    fontSize: '14px',
    lineHeight: '16px',
    color: '#656565',
  },

  nameRatingWrapper: {
    marginLeft: '10px',
  },

  updatedAtWrapper: {
    marginTop: 'auto',
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },

  updatedAtText: {
    marginRight: '20px',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 'bold',
  },
}))

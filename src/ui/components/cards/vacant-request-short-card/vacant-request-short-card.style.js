import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  cardWrapper: {
    width: '330px',
    height: '360px',

    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .1)',
  },

  cardTitleBlockWrapper: {
    padding: '10px 10px 20px',
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
    padding: '10px 13px',
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
  },

  cardPrice: {
    fontSize: '13px',
    lineHeight: '15px',
    color: '#006CFF',
  },

  cardTime: {
    fontSize: '10px',
    lineHeight: '11px',
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
    fontSize: '10px',
    fontWeight: 'bold',
  },
}))

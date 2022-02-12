import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },
  formWrapper: {
    marginTop: '32px',
  },
  tableWrapper: {
    marginTop: '32px',
    width: '100%',
    height: '100%',
  },

  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  cardWrapper: {
    width: '290px',
    height: '330px',

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
    marginBottom: '20px',
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
  },

  userRating: {
    marginLeft: '100px',
  },

  timeInfoWrapper: {
    width: '100%',
    margin: '22px 0 30px',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: '13px',
    lineHeight: '15px',
    color: '#006CFF',
  },

  cardTime: {
    fontSize: '10px',
    lineHeight: '11px',
    color: '#656565',
  },
}))

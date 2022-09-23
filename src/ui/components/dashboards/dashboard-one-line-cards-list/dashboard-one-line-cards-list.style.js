import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  cardsWrapper: {},
  cardWrapper: {
    width: '277px',
    background: 'linear-gradient(157deg,#fff 50%, #F2FBF7 50%);',
    boxShadow: '0px 2px 11px 2px #DFDFDF',
    padding: '20px',
    borderRadius: '8px',
    height: '111px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '5px',

    '&:hover': {
      background: 'linear-gradient(157deg,#fff 50%, #d8fded 50%);',
    },
  },

  cardErrorWrapper: {
    background: 'linear-gradient(157deg,#fff 50%, #FBF2F2 50%);',
    '&:hover': {
      background: 'linear-gradient(157deg,#fff 50%, #f8dede 50%);',
    },
  },
  cardSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: '29px',
    height: '28px',
    color: '#c4c4c4',
  },
  cardListTitle: {
    fontSize: '20px',
    lineHeight: '27px',
    color: '#001029',
    fontWeight: 600,
    marginLeft: '86px',
  },
  cardSubTitle: {
    width: '127px',
    color: '#001029',
  },
  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
    color: '#001029',
  },
  cardListSubTitle: {
    color: '#656565',
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '10px',
    marginLeft: '86px',
  },
  cardHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swiper: {
    height: 170,
    margin: '0 43px',
    padding: '0 45px',
  },
  addButton: {
    marginRight: '50px',
  },
  nextButton: {},
}))

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardsWrapper: {},
  cardWrapper: {
    width: '277px',
    // background: 'linear-gradient(157deg,#fff 50%, #F2FBF7 50%);',
    // background: `linear-gradient(157deg,${theme.palette.background.main} 50%, #F2FBF7 50%)`,
    background: theme.palette.linearGradient.successDashboardCard,
    // boxShadow: '0px 2px 11px 2px #DFDFDF',

    boxShadow: `0px 2px 11px 2px ${theme.palette.boxShadow.main}`,

    padding: '20px',
    borderRadius: '8px',
    height: '111px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '5px',

    transition: '0.3s ease',

    '&:hover': {
      // background: 'linear-gradient(157deg,#fff 50%, #d8fded 50%) !important',

      background: theme.palette.linearGradient.hoverSuccessDashboardCard,
    },
  },

  cardErrorWrapper: {
    // background: 'linear-gradient(157deg,#fff 50%, #FBF2F2 50%);',

    transition: '0.3s ease',

    background: theme.palette.linearGradient.negativeDashboardCard,
    '&:hover': {
      // background: 'linear-gradient(157deg,#fff 50%, #f8dede 50%);',
      background: theme.palette.linearGradient.hoverNegativeDashboardCard,
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
    color: theme.palette.text.general,
    fontWeight: 600,
    marginLeft: '86px',
  },
  cardSubTitle: {
    width: '127px',
    color: theme.palette.text.second,
  },
  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
    color: theme.palette.text.general,
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
    width: '157px',
    height: '40px',
    marginRight: '90px',
  },
  '@media (max-width: 768px)': {
    cardWrapper: {
      width: '200px',

      height: '91px',
    },
    swiper: {
      minWidth: '300px',
      height: 150,
      margin: '0 5px',
      padding: '0 10px',
      marginBottom: '15px',
    },

    cardListTitle: {
      marginLeft: '15px',
    },
    cardListSubTitle: {
      marginLeft: '15px',
    },
  },
}))

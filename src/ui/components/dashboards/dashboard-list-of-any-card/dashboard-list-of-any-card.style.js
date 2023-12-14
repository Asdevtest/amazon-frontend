import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardsWrapper: {
    width: '485px',
    padding: '25px 0 30px',
    backgroundColor: theme.palette.background.general,
    // boxShadow: '0px 2px 11px 2px #DFDFDF',
    boxShadow: `0px 2px 11px 2px ${theme.palette.boxShadow.general}`,
    borderRadius: '8px',
  },

  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 35px 10px 30px',
    borderBottom: '1px solid #eeeeee',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      // backgroundColor: '#f1f1f1',
      backgroundColor: theme.palette.background.second,
    },
  },
  cardValueWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  cardListTitle: {
    fontSize: '18px',
    lineHeight: '27px',
    color: theme.palette.text.general,
    fontWeight: 600,
  },
  cardListSubTitle: {
    color: theme.palette.text.second,
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '10px',
  },

  cardValueTitle: {
    fontSize: '24px',
    lineHeight: '33px',
    color: theme.palette.text.general,
    fontWeight: 700,
  },

  cardSubTitle: {
    color: theme.palette.text.second,
  },
}))

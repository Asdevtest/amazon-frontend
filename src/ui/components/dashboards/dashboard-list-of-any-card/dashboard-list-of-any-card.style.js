import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  cardsWrapper: {
    width: '485px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 11px 2px #DFDFDF',
    borderRadius: '8px',
  },

  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 40px',
    borderBottom: '1px solid #eeeeee',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  cardValueWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  cardListTitle: {
    fontSize: '20px',
    lineHeight: '27px',
    color: '#001029',
    fontWeight: 600,
  },
  cardListSubTitle: {
    color: '#656565',
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '10px',
  },

  cardValueTitle: {
    fontSize: '24px',
    lineHeight: '33px',
    color: '#001029',
    fontWeight: 700,
  },
}))

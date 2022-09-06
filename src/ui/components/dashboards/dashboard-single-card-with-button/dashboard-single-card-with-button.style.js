import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles({
  cardWrapper: {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 11px 2px #DFDFDF',
    cursor: 'pointer',
    padding: '30px 20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '316px',
  },
  cardWrapperHorizontal: {
    height: '115px',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleWrapperHorizontal: {gap: '38px'},
  cardTitle: {
    width: '111px',
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
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
    color: '#001029',
    textAlign: 'end',
  },
})

import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles({
  cardWrapper: {
    height: '148px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 11px 2px #DFDFDF',
    cursor: 'pointer',
    padding: '30px 20px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#656565',
    textAlign: 'end',
    width: '140px',
  },
  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
    color: '#001029',
    textAlign: 'end',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
  },
})

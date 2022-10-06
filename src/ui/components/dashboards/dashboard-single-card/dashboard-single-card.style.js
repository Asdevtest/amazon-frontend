import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  cardWrapper: {
    height: '148px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 11px 2px #DFDFDF',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
}))

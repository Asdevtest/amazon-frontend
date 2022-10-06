import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '869px',
    padding: '10px 0',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  statusWrapper: {},
  statusTextDesciption: {
    color: 'grey',
    fontSize: '18px',
    marginBottom: 0,
    display: 'flex',
    alignItems: 'end',
    gap: '10px',
  },
  statusText: {
    fontSize: '18px',
    color: 'black',
  },
  detailsWrapper: {
    marginTop: '5px',
    width: '100%',
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '4px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
  },
  titleWrapper: {},
  titleText: {
    fontSize: 18,
    fontWeight: 700,
  },
  reasonWrapper: {
    marginTop: '10px',
  },
  reasonText: {},
  footerWrapper: {
    marginTop: 25,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '&:not(:first-of-type)': {
      marginTop: '20px',
    },
  },
  labelValueBlockWrapper: {},

  rightSide: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
  },

  actionButton: {
    height: '40px',
  },
  successBtn: {
    width: '107px',
    marginLeft: '30px',
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
  editBtn: {
    width: '214px',
    backgroundColor: '#F44336',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },

  btnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionBtnWrapperStyle: {
    flex: 1,
    display: 'flex',
  },

  actionBtnWrapperStyleNotFirst: {
    // marginLeft: '50px',
  },
}))

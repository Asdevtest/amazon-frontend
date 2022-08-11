import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    padding: '30px 30px',
    width: '100%',
    height: '263px',
  },
  mainBlockWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  middleBlockWrapper: {
    width: '350px',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .1)',
    padding: '10px',
  },
  middleBlockItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleBlockWrapper: {
    display: 'flex',
    marginBottom: '20px',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userPhoto: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
    marginRight: '30px',
  },
  requestInfoWrapper: {
    display: 'flex',
    gap: '40px',
  },
  requestItemInfoWrapper: {
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  blockInfoWrapper: {
    minWidth: '403px',
    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
    padding: '30px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
  },
  title: {
    width: '314px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#354256',
    overflow: 'auto',
    height: 80,
  },

  btnsBlockWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
  },
  actionBtn: {
    width: '244px',
    height: '40px',
  },
  btnsWrapper: {
    display: 'flex',
    marginBottom: '30px',
    justifyContent: 'space-between',
  },
  requestStatus: {
    marginLeft: '15px',
    fontSize: '18px',
    lineHeight: '140%',
  },

  personInfoWrapper: {
    display: 'flex',
    height: '60px',
    alignItems: 'center',
  },

  userName: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '140%',
    color: '#001029',
  },

  personWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  leftSideWrapper: {
    width: '403px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  leftSideFooterWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
  },

  middleSideWrapper: {
    width: '285px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  requestItemInfoProposalsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  transactions: {
    color: '#001029',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
  },

  updatedAtWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },

  updatedAtText: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16px',
    color: '#001029',
  },

  proposalsWrapper: {
    width: '668px',
  },

  proposalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  proposalComment: {
    margin: '30px 0 20px 0',
    overflow: 'auto',
    height: '76px',
    color: '#001029',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
  },

  rightSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timeAndPriceWrapper: {
    display: 'flex',
    width: '506px',
    justifyContent: 'space-between',
  },

  timeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '58%',

    '& > :first-child': {
      color: '#001029',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '19px',
    },
  },

  rightItemSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '35%',

    '& > :first-child': {
      color: '#001029',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '19px',
    },
  },

  statusField: {
    display: 'flex',
    alignItems: 'center',
  },

  circleIndicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '10px',
  },

  status: {
    color: '#001029',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
    maxWidth: '120px',
  },

  timeCount: {
    color: '#001029',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '19px',
  },

  price: {
    color: '#006CFF',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '19px',
  },

  mainWrapper: {
    width: '585px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  mainHeaderWrapper: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
  },

  mainBlockFooterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  updatedWrapper: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
  },

  updatedText: {
    marginRight: 5,
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#656565',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    padding: '30px 30px',
    width: '100%',
    minHeight: 'fit-content',
  },
  standartText: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  mainBlockWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
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

  title: {
    width: 479,
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '21px',

    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  btnsBlockWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
  },
  actionBtn: {
    width: '244px',
    height: '30px',
  },

  personInfoWrapper: {
    display: 'flex',
    height: '60px',
    alignItems: 'center',
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

  transactions: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
  },

  proposalsWrapper: {
    minWidth: 700,
    display: 'flex',
    gap: 20,
  },

  proposalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  proposalComment: {
    margin: '20px 0 10px 0',
    overflow: 'auto',
    height: '130px',
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },

  rightSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
  },

  price: {
    color: theme.palette.primary.main,
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

  mainInfosWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0 20px',
    gap: 10,
  },

  mainInfosSubWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
    alignSelf: 'center',
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
    padding: '15px 15px',
  },

  fieldLabel: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  fieldContainer: {
    minHeight: 55,
    marginBottom: '25px !important',

    '&:last-child': {
      marginBottom: '0px !important',
    },
  },

  subNameContainer: {
    minHeight: 55,
    gap: 10,
    margin: '0 !important',
  },

  accentText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  cardTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    width: '500px',
  },

  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  asinAndIdWrapper: {
    display: 'flex',
    gap: 30,
  },
  idWrapper: {
    display: 'flex',
    gap: 5,
  },
  asinWrapper: {
    display: 'flex',
    gap: 5,
  },
  idText: {
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.second,
  },
  linkSpan: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '140%',
    color: theme.palette.primary.main,
  },
  idTextDark: {
    color: theme.palette.text.general,
    fontWeight: 600,
  },
  titleAndIdWrapper: {
    display: 'flex',
    gap: 60,
  },

  confirmationToWorkText: {
    color: '#09BB49',
  },

  urgentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  urgentText: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  requestInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
}))

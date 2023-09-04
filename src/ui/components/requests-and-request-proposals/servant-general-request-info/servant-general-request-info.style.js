import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: 30,
    display: 'flex',
    borderRadius: 4,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
  },

  mainBlockWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
  },

  mainWrapper: {
    maxWidth: 310,
    flex: '1 1 auto',
  },

  personInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },

  personWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  userPhoto: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '50%',
  },

  transactions: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
    marginBottom: 35,
  },

  btnsBlockWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  actionBtn: {
    width: 185,
    height: 30,
  },

  requestInfoWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },

  titleAndIdWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,

    p: {
      fontSize: 16,
    },
  },

  title: {
    maxWidth: 350,
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  linkSpan: {
    fontSize: '18px !important',
    lineHeight: '25px',
  },

  idTitleWrapper: {
    display: 'flex',
    gap: 5,
  },

  idText: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.second,
  },

  idTextDark: {
    color: theme.palette.text.general,
    fontWeight: 600,
  },

  standartText: {
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.text.second,
    marginBottom: 15,
  },

  confirmationToWorkText: {
    color: '#09BB49',
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 15,
  },

  urgentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  urgentIcon: {
    width: 20,
    height: 20,
  },

  urgentText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  mainInfosWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    gap: 10,
  },

  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardTitle: {
    maxWidth: 400,
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  mainInfosSubWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
    alignSelf: 'center',
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
    padding: '30px 15px',
  },

  accentText: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  proposalsWrapper: {
    display: 'flex',
    flex: '1 1 auto',
    gap: 20,
  },

  sliderWrapper: {
    width: '100% !important',
  },

  fieldLabel: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: theme.palette.text.second,
    marginBottom: 5,
  },

  fieldContainer: {
    minHeight: 40,
    marginBottom: '25px !important',

    '&:last-child': {
      marginBottom: '0px !important',
    },
  },
}))

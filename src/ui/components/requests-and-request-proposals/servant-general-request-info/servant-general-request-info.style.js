import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: 30,
    display: 'flex',
    borderRadius: 16,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    marginBottom: 20,
  },

  mainBlockWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
  },

  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 310,
    flex: '1 1 auto',
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
  },

  btnsBlockWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
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
    maxWidth: '255px',
    gap: 5,
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

  idTitleWrapper: {
    display: 'flex',
    gap: 5,
    overflow: 'hidden',
  },

  idText: {
    color: theme.palette.text.second,
    fontSize: 14,
  },

  idTextDark: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
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

  urgentIconSmall: {
    width: 16,
    height: 16,
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
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardTitle: {
    maxWidth: 320,
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

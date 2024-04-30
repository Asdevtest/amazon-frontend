import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 600,
    height: 510,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },

  titleContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '28px',
    fontWeight: 600,
  },

  activeSessions: {
    marginLeft: 'auto',
    lineHeight: '28px',
    fontWeight: 500,
    color: theme.palette.primary.main,

    '&:hover': {
      textDecoration: 'underline',
      opacity: 0.8,
      transition: '.3s ease',
    },
  },

  back: {
    margin: 0,
  },

  label: {
    marginBottom: 5,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.secondary,
  },

  field: {
    position: 'relative',
  },

  visibilityIcon: {
    position: 'absolute',
    right: 10,
    top: 27,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },

  validationMessage: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: '-15px',
    justifyContent: 'start',
    gap: '5px',
  },

  validationText: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
  },

  red: {
    color: 'red !important',
  },

  validationHiddenMessage: {
    display: 'flex',
    justifyContent: 'end',
  },

  validationHiddenText: {
    visibility: 'hidden',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
  },

  visibility: {
    visibility: 'visible',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
  },
}))

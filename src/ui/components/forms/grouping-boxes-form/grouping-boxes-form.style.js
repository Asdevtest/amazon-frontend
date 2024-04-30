import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minHeight: 600,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingRight: 10,
  },

  boxesWrapper: {
    display: 'flex',
    gap: '40px',

    flexGrow: 1,
  },
  buttonsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,

    position: 'sticky',
    bottom: 0,
    right: 0,
    marginRight: 5,
  },

  leftToRedistributeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  leftToRedistribute: {
    color: theme.palette.text.second,
    marginRight: 5,
  },

  modalTitleSubWrapper: {
    display: 'flex',
  },

  iconText: {
    color: theme.palette.primary.main,
    marginLeft: 5,
    fontWeight: 600,
    fontSize: 18,
  },

  standartIconWrapper: {
    border: 'none',
  },

  iconWrapper: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 5,

    display: 'flex',

    width: 190,
  },

  modalTitleWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '40px',
    fontWeight: '600',
    color: theme.palette.text.general,
    marginRight: 20,
  },

  input: {
    fontSize: '14px',
    textAlign: 'center',
  },

  newBoxes: {
    minWidth: 527,
  },

  bigPlus: {
    width: '67px !important',
    height: '67px !important',
    margin: '15px 0 30px 0',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  alertText: {
    color: 'red',
  },

  newBoxesWrapper: {
    marginTop: 41,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    alignItems: 'center',
  },

  needChooseMainBox: {
    width: '100%',
    color: theme.palette.primary.main,
    marginTop: 100,
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
  },

  leftToRedistributeCount: {
    color: theme.palette.text.general,
    fontSize: 18,
  },

  button: {
    height: '40px',
    padding: '0 25px',
  },
  cancelButton: {
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.general,
  },

  marginBox: {
    '&:not(:last-child)': {
      marginBottom: '20px',
    },
  },

  asinTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },
}))

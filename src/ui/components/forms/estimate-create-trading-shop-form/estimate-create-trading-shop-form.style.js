import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalMessageWrapper: {
    width: '586px',
    minHeight: '168px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },

  modalMessageTitle: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '140%',
    color: theme.palette.text.general,
    alignSelf: 'start',
  },

  buttonOk: {
    padding: '8px 36px',
    marginRight: '10px',
  },

  buttonCancel: {
    padding: '8px 36px',
    backgroundColor: theme.palette.background.general,
    color: theme.palette.text.general,
    '&:hover': {
      backgroundColor: 'rgba(231, 231, 231, 0.801)',
    },
  },

  buttonsWrapper: {
    alignSelf: 'center',
  },

  confirmText: {
    fontSize: 18,
    width: 400,
    textAlign: 'center',

    color: theme.palette.text.general,
  },

  fieldInput: {
    height: 40,
    width: 273,
  },

  applyBtn: {
    color: theme.palette.primary.main,
  },

  estimateCostWrapper: {
    height: 40,
    width: 273,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid rgba(217, 222, 229, 1)',
    padding: '7px 8px',
    backgroundColor: '#e4e7ea',
    borderRadius: '4px',
  },

  fieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
  },

  oneFieldInRow: {
    alignSelf: 'flex-start',
  },

  fieldLabel: {
    fontSize: 16,
    color: theme.palette.text.general,
  },

  reqMultiplier: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.palette.primary.main,
  },

  multiplierWrapper: {
    height: 40,
    width: 273,
    display: 'flex',
    padding: '7px 8px',
    backgroundColor: '#e4e7ea',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '4px',
  },
}))

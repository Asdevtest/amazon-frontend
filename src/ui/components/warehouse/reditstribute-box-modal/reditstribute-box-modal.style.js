import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    paddingRight: 10,
  },
  boxesWrapper: {
    display: 'flex',
    gap: '40px',
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

  modalTitleWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '40px',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '40px',
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: '18px',
    lineHeight: '140%',
  },

  heightFieldAuto: {
    height: '86px',
    padding: 0,
  },

  commentLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },

  currentBoxTitle: {
    display: 'flex',
    gap: '23px',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.secondary,
    marginBottom: '10px',
  },

  button: {
    height: '40px',
    padding: '0 25px',
  },
  cancelButton: {},

  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
  },

  asinTextWrapper: {
    display: 'flex',
    gap: 5,
  },
}))

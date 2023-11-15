import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalWrapper: {
    width: '100%',
    padding: 10,
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
  },

  saveBox: {
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
    marginTop: '30px',
  },

  saveBtn: {
    width: '123px',
    height: '40px',
  },

  closeBtn: {
    width: '123px',
    height: '40px',
    color: theme.palette.text.general,
  },

  link: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  barCodeWrapper: {
    display: 'flex',
    gap: 15,
  },
}))

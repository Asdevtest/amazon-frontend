import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '700px',
  },

  modalTitle: {
    color: theme.palette.text.general,

    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
  },

  input: {
    width: '400px',
  },
  saveBox: {
    display: 'flex',
    gap: 20,
    justifyContent: 'end',
    marginTop: '40px',
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

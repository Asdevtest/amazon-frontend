import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '400px',
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
    marginTop: '16px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  actionButton: {
    width: '179px',
    height: '40px',
  },
}))

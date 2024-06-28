import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalWrapper: {
    width: '425px',
    padding: 10,
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
    textAlign: 'center',
  },

  saveBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  boxAndPrepIdContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  boxAndPrepIdTitle: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textTransform: 'uppercase',
  },

  boxAndPrepIdInput: {
    width: 220,
    height: 30,
    borderRadius: 7,
  },

  input: {
    padding: '5px 10px',
    fontSize: 14,
    lineHeight: '19px',
  },

  updatedContainer: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  updatedText: {
    color: theme.palette.text.secondary,
  },

  updatedTitle: {},
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    borderRadius: 12,
    boxShadow: theme.palette.boxShadow.paper,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
  },

  remarkText: {
    color: '#F68511',
  },

  reworkText: {
    color: theme.palette.text.second,
  },

  icon: {
    width: '24px !important',
    height: '24px !important',
    padding: 2,
    background: 'rgba(251, 29, 91, 0.28)',
    boxShadow: '0 0 5px 5px rgba(251, 29, 91, 0.2)',
    borderRadius: '50%',
  },

  fieldContainer: {
    margin: 0,
  },

  field: {
    height: '100%',
    padding: 0,
    fontSize: 14,
    lineHeight: '19px',
    borderRadius: 12,
    boxShadow: theme.palette.boxShadow.paper,
  },

  input: {
    padding: 15,
  },
}))

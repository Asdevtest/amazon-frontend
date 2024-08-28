import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '200px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
    marginBottom: '20px',
  },

  label: {
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '5px',
  },

  btnsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))

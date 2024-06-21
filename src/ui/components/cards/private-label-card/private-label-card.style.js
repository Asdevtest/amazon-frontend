import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    borderRadius: '4px',
    minHeight: '380px',
    width: '440px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '320px',
    },
  },
  imgWrapper: {
    marginTop: 16,
    height: '220px',
    width: '50%',
    alignSelf: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: '4px 4px 0px 0px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  wrapper: {
    padding: '16px 24px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },

  category: {
    height: '25px',
  },

  textWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0px',
  },
  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
  },
  label: {
    flexGrow: 1,
  },
  value: {
    whiteSpace: 'nowrap',
  },
  inputWrapper: {
    flexShrink: 1,
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    width: '54px',
  },
  input: {
    color: 'rgba(143, 152, 165, 1)',
    padding: '0',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: 400,
    lineHeight: 'initial',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  button: {
    width: 'max-content',
  },
  divider: {
    marginBottom: '4px',
  },
}))

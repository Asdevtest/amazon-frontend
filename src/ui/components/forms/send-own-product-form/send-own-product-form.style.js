import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    flexWrap: 'wrap',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
  },
  fieldWithBtn: {
    display: 'flex',
    width: '100%',
  },
  providersWrapper: {
    display: 'flex',
    width: '100%',
    gap: '10px',
    justifyContent: 'space-between',
  },
  inlineBtn: {
    margin: '32px 0px 20px 20px',
    padding: '4px 16px',
  },
  field: {
    flexBasis: '100%',
  },
  multiline: {
    height: 'auto',
    width: '100%',
  },
  divider: {
    width: '100%',
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(2.5),
  },
  submit: {
    alignSelf: 'flex-end',
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    padding: '20px',
  },
  warehouseInfoWrapper: {},
  ordersWrapper: {
    flexGrow: 1,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  subTitle: {
    color: theme.palette.text.secondary,
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
    flexGrow: 1,
    margin: '0 -20px',
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(2.5),
  },
  submit: {
    marginRight: theme.spacing(2),
  },
  cancelBtn: {
    marginLeft: theme.spacing(2),
  },
  numberInputFieldsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberInputField: {
    margin: '0 5px',
  },
}))

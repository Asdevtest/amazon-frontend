import {createStyles} from '@material-ui/styles'

export const styles = createStyles(() => ({
  fieldsWrapper: {},
  alert: {
    marginTop: '24px',
  },
  button: {
    marginRight: '24px',
  },
  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '24px',
  },

  strategyLabel: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
    marginBottom: '12px',
  },

  nativeSelect: {
    width: '300px',
  },

  mainWrapper: {
    display: 'flex',
  },

  leftBlockWrapper: {
    width: '500px',
  },

  rightBlockWrapper: {
    display: 'flex',
    marginLeft: '30px',
    justifyContent: 'space-between',
    width: '800px',
  },

  fieldsSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '380px',
  },

  shortInput: {
    width: '180px',
  },
}))

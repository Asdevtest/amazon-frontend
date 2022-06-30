import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  title: {
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
    marginBottom: 30,
  },

  btnsWrapper: {
    width: 'min-content',
  },

  button: {
    marginBottom: 20,
    width: '100%',
    height: 40,
  },

  btnText: {
    marginRight: 10,
  },

  btnTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    whiteSpace: 'nowrap',
  },
}))

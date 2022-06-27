import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    width: '445px',
    minHeight: '168px',
  },
  title: {
    textAlign: 'center',
    width: '350px',

    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: '#001029',
  },

  button: {
    width: '130px',
    fontSize: '18px',
  },
}))

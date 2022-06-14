import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  resultButtonsWrapper: {
    margin: '20px 0',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '445px',
    minHeight: '168px',
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  dialogPadding: {
    padding: '20px 24px',
  },

  warningDialogPadding: {
    padding: '0',
    '&:first-child': {
      padding: '0',
    },
  },

  warningPaper: {
    borderRadius: '10px',
    backgroundColor: 'red',
  },
}))

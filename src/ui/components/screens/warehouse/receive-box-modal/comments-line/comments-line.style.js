import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  heightFieldAuto: {
    height: 'auto',
    minWidth: '306px',
  },
  mainWrapper: {
    display: 'flex',
    gap: '10px',
  },
}))

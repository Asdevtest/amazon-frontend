import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },

  paper: {
    border: '1px solid #C8CED3',
    padding: '8px 16px',
    height: 'max-content',
  },
  typoSetChoosenBoxe: {
    color: 'red',
  },
  selectBox: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
  },
  spaceBetweenStyle: {
    justifyContent: 'space-between',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
}))

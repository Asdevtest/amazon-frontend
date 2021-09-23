import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  box: {
    border: 0,
  },
  boxNoPrice: {
    border: '1px solid red',
  },
  tableCell: {
    padding: '0 5px',
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  tableCellRight: {
    textAlign: 'right',
  },
  imgWrapper: {
    height: '50px',
    width: '50px',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  crossBtn: {
    width: '20px',
    height: '20px',
    minWidth: 'auto',
  },
  tableCellCrossBtn: {
    border: 0,
    padding: '0 10px',
  },
}))

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
  priceCellRight: {
    textAlign: 'center',
    minWidth: '150px',
  },
  imgWrapper: {
    minHeight: '50px',
    width: '50px',
  },
  img: {
    height: '60px',
    width: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  crossBtn: {
    width: '20px',
    height: '20px',
    minWidth: 'auto',
  },
  tableCellCrossBtn: {
    border: 0,
    padding: '0 10px',
    verticalAlign: 'middle',
  },

  boxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
  },

  boxItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '500px',
    gap: '5px',
  },

  superBoxTypo: {
    minWidth: '40px',
    color: 'blue',
    fontWeight: 'bold',
  },
}))

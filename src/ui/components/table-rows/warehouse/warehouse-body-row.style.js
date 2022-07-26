import {createStyles} from '@material-ui/core'

export const styles = createStyles({
  productCell: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '300px',
  },
  img: {
    height: '64px',
    width: '64px',
    marginRight: '8px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  boxLastRow: {
    borderBottom: '1px solid rgba(217, 222, 229, 1)',
  },
  cellValueNumber: {
    textAlign: 'right',
    flexDirection: 'row-reverse',
  },
  centerCell: {
    textAlign: 'center',
  },
  subBoxesTableWrapper: {},
  checkboxRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  barCode: {
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(0.99)',
    },
  },
  button: {
    width: '100%',
    display: 'flex',
  },
})

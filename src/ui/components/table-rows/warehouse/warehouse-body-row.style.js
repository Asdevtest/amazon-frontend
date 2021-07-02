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
  },
  boxLastRow: {
    borderBottom: '1px solid rgba(217, 222, 229, 1)',
  },
  cellValueNumber: {
    textAlign: 'right',
    flexDirection: 'row-reverse',
  },
})

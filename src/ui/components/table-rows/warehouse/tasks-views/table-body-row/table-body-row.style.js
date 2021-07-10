import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles({
  defaultOrderSpan: {
    color: 'rgba(0, 123, 255, 1)',
  },
  changeOrderSpan: {
    color: 'rgb(16, 179, 49)',
  },
  description: {
    color: '#939292',
    textDecoration: 'line-through',
  },
  centerTextCell: {
    textAlign: 'center',
  },
  img: {
    width: '40px',
    height: '40px',
  },
  descriptionWrapper: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  imagesWrapper: {
    flexDirection: 'column',
    border: '1px solid rgba(0, 123, 255, 0.5)',
    borderRadius: '10px',
    gap: '5px',
    padding: '3px',
    textAlign: 'center',
    display: 'inline-block',
    marginRight: '5px',
  },
  imgNum: {
    margin: '0',
    fontSize: '14px',
  },
  imgWrapper: {
    display: 'flex',
    gap: '2px',
  },
  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  cancelBtn: {
    marginLeft: '10px',
  },
})

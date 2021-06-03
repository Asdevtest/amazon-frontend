import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  modalSubTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '13px',
    fontWeight: 700,
    lineHeight: '15px',
    marginBottom: '8px',
  },
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },

  footerTitle: {
    color: 'rgba(189, 194, 209, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    flexGrow: 1,
  },
  inputWrapper: {
    marginBottom: '16px',
  },
  input: {
    width: '100%',
  },
  inputLabel: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginBottom: '8px',
  },

  imgBox: {
    backgroundColor: 'rgba(196, 196, 196, 1)',
    height: '64px',
    width: '64px',
    borderRadius: '3px',
    textAlign: 'center',
    position: 'relative',
    margin: '12px',
  },
  imgCross: {
    color: '#fff',
    fontSize: '68px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -59%)',
  },
  mainPaperWrapper: {
    border: '1px solid #C8CED3',
    padding: '8px 16px',
    height: 'max-content',
  },
  typoSetChoosenBoxes: {
    color: 'red',
  },
  boxTypeCheckbox: {
    display: 'flex',
  },
  selectWareHouse: {
    width: '160px',
  },
  boxDeliveryMathod: {
    marginLeft: '10px',
  },
  selectStatus: {
    width: '200px',
  },
  boxCloseBatch: {
    display: 'flex',
    alignItems: 'center',
  },
}))

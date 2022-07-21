import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {},

  batchesExistBlock: {
    width: '900px',
  },

  title: {
    textAlign: 'center',
  },

  messageWrapper: {
    width: '460px',
    textAlign: 'center',
    margin: '30px 0',
  },

  mainTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '33px',
    color: 'black',
  },

  tableWrapper: {
    marginTop: '10px',
    height: '37vh',
  },

  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  btnsSecondWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '460px',
  },

  btnsSubWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  cancelBtn: {
    marginLeft: '40px',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },

  titleSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
}))

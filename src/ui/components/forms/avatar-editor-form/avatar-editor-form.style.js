import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    width: '600px',
    height: '300px',

    display: 'flex',
    alignItems: 'center',

    padding: '20px',
  },

  imgWrapper: {
    marginLeft: '70px',
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: '160px',
    height: '160px',

    border: '1px solid #007BFF',
    borderRadius: '50%',
  },

  btnsWrapper: {
    marginTop: '20px',
  },
}))

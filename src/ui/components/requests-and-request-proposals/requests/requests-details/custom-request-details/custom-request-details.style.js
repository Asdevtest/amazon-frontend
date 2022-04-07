import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',

    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .3)',

    padding: '10px 5px 10px',
  },

  mainWrapper: {
    display: 'flex',

    width: '100%',
  },

  conditionsFieldWrapper: {
    width: '100%',
  },

  conditionsField: {
    width: '100%',
    minHeight: '20vh',
    color: 'rgba(61, 81, 112, 1)',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  accordion: {
    width: '100%',
    backgroundColor: 'red',
  },

  title: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#354256',
  },

  imgBox: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  photoWrapper: {
    marginRight: '100px',
    width: '200px',
  },
}))

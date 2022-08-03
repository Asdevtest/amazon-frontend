import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: 0,
    // marginBottom: '30px',
  },

  mainWrapper: {
    display: 'flex',

    padding: '0 40px 40px 40px',
    width: '100%',
  },

  conditionsFieldWrapper: {
    width: '100%',
    margin: 0,
  },

  conditionsField: {
    width: '100%',
    minHeight: '20vh',
    fontFamily: 'inherit',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'inherit',
    border: 'none',
    fontWeight: '400',
    lineHeight: '1.5',
    resize: 'none',
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
    marginRight: '50px',
    width: '200px',
  },

  filesWrapper: {
    width: '350px',
    maxHeight: '220px',
    overflow: 'auto',
  },

  filesContainer: {
    width: 'auto',
    marginRight: '50px',
  },

  linkText: {
    color: '#007BFF',
    cursor: 'pointer',
    transition: '.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'auto',

    '&:hover': {
      opacity: '0.8',
    },
  },

  details: {
    padding: 0,
  },

  files: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },

  conditionsLabel: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },
}))

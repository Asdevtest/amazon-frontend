import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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

    color: theme.palette.text.general,
  },

  accordion: {
    width: '100%',
    // backgroundColor: 'red',
  },

  title: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: theme.palette.text.second,
  },

  imgBox: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  photoWrapper: {
    marginRight: '50px',
    width: '200px',
  },

  filesWrapper: {
    height: 'min-content',
  },

  filesContainer: {
    width: 'auto',
    marginRight: '50px',
  },

  linkText: {
    color: theme.palette.primary.main,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
    color: theme.palette.text.general,
  },

  conditionsLabel: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },
}))

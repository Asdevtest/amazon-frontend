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

    padding: '0 110px 66px 30px',
    width: '100%',

    gap: 60,
  },

  conditionsFieldWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  conditionsField: {
    width: '100%',
    minHeight: '20vh',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.5',

    whiteSpace: 'pre-wrap',

    color: theme.palette.text.general,
  },

  accordion: {
    width: '100%',
    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    // backgroundColor: 'red',
  },

  title: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: theme.palette.text.general,

    padding: '0 14px',
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
    display: 'flex',
    height: '100%',
    minWidth: 358,
    flexDirection: 'column',
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
  conditionsSubLabel: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    color: theme.palette.text.general,
  },
  filesLabel: {
    marginBottom: 10,
  },
  conditionsPhotosWraper: {
    marginTop: 15,
    marginBottom: 54,
  },
}))

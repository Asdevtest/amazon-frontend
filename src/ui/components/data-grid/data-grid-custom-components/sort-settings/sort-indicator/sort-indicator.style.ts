import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: '100%',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',

    border: `1px solid ${theme.palette.input.customBorder}`,
    padding: '0 10px',

    borderRadius: '25px 0px 0px 25px',
  },

  indicatorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    width: '18px',
    transition: 'all 0.5s ease',

    div: {
      backgroundColor: theme.palette.primary.main,
      height: '2px',
      borderRadius: '100px',
    },
  },

  descIndicator: {
    '& > div:nth-of-type(1)': {
      width: '100%',
    },
    '& > div:nth-of-type(2)': {
      width: '66%',
    },
    '& > div:nth-of-type(3)': {
      width: '33%',
    },
  },

  ascIndicator: {
    '& > div:nth-of-type(1)': {
      width: '33%',
    },
    '& > div:nth-of-type(2)': {
      width: '66%',
    },
    '& > div:nth-of-type(3)': {
      width: '100%',
    },
  },
}))

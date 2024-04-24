import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '800px',
    padding: 10,
  },

  title: {
    color: theme.palette.text.general,
  },

  tableWrapper: {
    marginTop: '10px',
    height: '30vh',
  },

  chosenGoodsTitle: {
    margin: '10px 0 5px',

    color: theme.palette.text.general,
  },

  btnsWrapper: {
    paddingRight: 5,
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0 10px',
  },

  betweenChipsText: {
    margin: '0 17px',
    minWidth: 100,

    color: theme.palette.text.second,
  },

  chipLeftMargin: {
    marginLeft: '10px',
  },

  chip: {
    marginBottom: 5,
    fontSize: '16px',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.01)',
    },
  },

  chipActive: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    color: theme.palette.primary.main,

    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },
}))

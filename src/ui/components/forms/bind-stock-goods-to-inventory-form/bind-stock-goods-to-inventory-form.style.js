import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '800px',
  },

  title: {
    color: theme.palette.text.general,
  },

  tableWrapper: {
    marginTop: '10px',
    height: '30vh',
  },

  chosenGoodsTitle: {
    margin: '24px 0 4px',

    color: theme.palette.text.general,
  },

  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 13px',
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
    color: theme.palette.text.general,
    fontSize: '16px',
    // backgroundColor: '#F4F4F4',
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

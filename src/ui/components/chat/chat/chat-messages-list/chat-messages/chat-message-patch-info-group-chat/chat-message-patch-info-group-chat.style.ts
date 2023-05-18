import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    // maxWidth: '60%',
    // flexGrow: 1,
    justifyContent: 'center',
  },

  groupText: {
    marginLeft: 5,
  },

  groupTitle: {
    fontWeight: 600,
    margin: '0 5px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: 200,
  },

  changeTitleWrapper: {
    display: 'flex',
    marginBottom: 30,
    alignItems: 'center',
  },

  changeIcon: {
    color: theme.palette.primary.main,
  },

  groupImage: {
    width: 150,
    height: 100,
    objectFit: 'contain',

    margin: '0 10px',

    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    backgroundColor: theme.palette.background.disabled,
    padding: '2px',
    borderRadius: 4,
  },

  option: {
    padding: '6px 13px',
    textAlign: 'center',
    fontSize: 14,
    transition: '.3s ease',
    borderRadius: 4,
    color: ' #656565',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F8F8F8',
    },
  },

  offSelected: {
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
    color: '#fff',
    cursor: 'auto',
  },

  onSelected: {
    background: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
    color: '#fff',
    cursor: 'auto',
  },
}))

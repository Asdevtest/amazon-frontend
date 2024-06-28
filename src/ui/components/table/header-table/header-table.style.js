import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  btnsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  btnsSubWrapper: {
    display: 'flex',
    gap: 20,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: '38px',
    fontSize: '16px',
    paddingLeft: '7px',
  },
}))

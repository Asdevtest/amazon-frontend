import { makeStyles } from 'tss-react/mui'

export const useTaskPrioritySelectorStyles = makeStyles()(theme => ({
  wrapper: {
    marginTop: '5px',
    marginBottom: '10px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0 15px',
    height: 'auto',
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,

    display: 'flex',
    alignItems: 'center !important',
    gap: '12px',
    justifyContent: 'center',

    fontSize: 14,
    fontWeight: 600,

    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },

  selectedButton: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',

    borderBottom: theme.palette.other.tableActiveFilterBtn,

    color: `${theme.palette.primary.main} !important`,
  },

  rushOrderImg: {
    width: '12px',
    height: '14px',
    marginLeft: 5,
  },
}))

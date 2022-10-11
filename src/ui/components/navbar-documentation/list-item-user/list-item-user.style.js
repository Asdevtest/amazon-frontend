export const styles = theme => ({
  root: {
    height: '50px',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '15px',
    color: theme.palette.text.general,
    padding: '0 16px',
    '&$selected': {},
    '&$selected:hover': {},
    '&:hover': {},
  },
  selected: {},
})

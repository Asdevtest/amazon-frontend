export const styles = theme => ({
  root: {
    height: '50px',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '15px',
    color: theme.palette.text.general,
    borderLeft: `5px solid transparent`,

    '&$selected': {
      borderLeft: `5px solid rgba(0, 123, 255, 1)`,
      backgroundColor: 'transparent',
    },
    '&$selected:hover': {
      borderLeft: `5px solid rgba(0, 123, 255, 1)`,
    },
    '&:hover': {},
  },
  selected: {},
})
